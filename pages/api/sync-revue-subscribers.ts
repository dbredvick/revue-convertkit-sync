import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { definitions } from "../../types/supabase";
import { getRevueSubscribers } from "../../utils/revue";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

type RevueSubscriber = {
  id: number;
  list_id: number;
  email: string;
  first_name: string;
  last_name: string;
  last_changed: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const newSubscribers: [RevueSubscriber] = await getRevueSubscribers();
      const existingSubscribers = await supabaseAdmin
        .from<definitions["revue_subscribers"]>("revue_subscribers")
        .select("*");

      const newSubscriberEmails = newSubscribers.map(
        (subscriber) => subscriber.email
      );

      const existingSubscriberEmails = existingSubscribers.data.map(
        (subscriber) => subscriber.email
      );

      let difference = newSubscriberEmails.filter(
        (email) => !existingSubscriberEmails.includes(email)
      );

      const subscribersToInsert = newSubscribers.filter((subscriber) =>
        difference.includes(subscriber.email)
      );

      const formatted: definitions["revue_subscribers"][] =
        subscribersToInsert.map((sub: RevueSubscriber) => ({
          email: sub.email,
          first_name: sub.first_name,
          last_name: sub.last_name,
          created_at: `${sub.last_changed}+00:00`, // gotta make the timestampz column happy
        }));

      const { data, error } = await supabaseAdmin
        .from<definitions["revue_subscribers"]>("revue_subscribers")
        .insert(formatted);

      if (error || existingSubscribers.error) {
        return res
          .status(500)
          .json({ error: error, existingError: existingSubscribers.error });
      }

      res.status(200).json({ data, error });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
