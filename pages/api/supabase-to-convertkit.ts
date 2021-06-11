import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { definitions } from "../../types/supabase";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const convertKitFormId = process.env.CONVERTKIT_FORM_ID; // create a form in ConvertKit to add subscribers to. This is the ID from the URL
const tagId = ""; // add your tagId here if you want to add one (id from ConvertKit URL)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const syncedAt = new Date();
      const { data, error } = await supabaseAdmin
        .from<definitions["revue_subscribers"]>("revue_subscribers")
        .select("*")
        .filter("convertkit_synced_at", "is", null)
        .limit(10);

      // there's totally a faster way to do this, PRs welcome.
      const results = await Promise.allSettled(
        data.map(async (subscriber) => {
          const emailData = {
            api_key: process.env.CONVERTKIT_API_KEY,
            email: subscriber.email,
            fields: {
              synced_from: "revue",
              synced_at: syncedAt.toUTCString(),
            },
            tags: tagId ? [tagId] : [],
          };
          const response = await fetch(
            `https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(emailData),
            }
          );
          const convertkitResult = await response.json();
          return {
            email: subscriber.email,
            convertkit_id: convertkitResult?.subscription?.subscriber?.id,
          };
        })
      );

      // would like to clean this up, but it works :meh:
      const errors = [];
      const emailsToUpdate = [];
      results.map((result) => {
        if (result.status === "fulfilled") {
          emailsToUpdate.push(result.value.email);
        } else if (result.status === "rejected") {
          errors.push(result.reason);
        }
      });
      const allConvertKitSuccessful = results.every(
        (x) => x.status === "fulfilled"
      );

      const updateResults = await supabaseAdmin
        .from<definitions["revue_subscribers"]>("revue_subscribers")
        .update({
          convertkit_synced_at: syncedAt.toISOString().replace("Z", "+00:00"), // timezone data type stuff
        })
        .in("email", emailsToUpdate);

      if (updateResults.error) {
        errors.push(updateResults.error);
      }

      res
        .status(
          allConvertKitSuccessful && !updateResults.error
            ? 200
            : errors.length
            ? 500
            : 207
        )
        .json({ errors, emailsUpdated: emailsToUpdate });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
