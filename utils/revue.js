export async function getRevueSubscribers() {
  const baseUrl = "https://www.getrevue.co/api";

  const result = await fetch(`${baseUrl}/v2/subscribers`, {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.REVUE_API_KEY}` },
  });

  return result.json();
}
