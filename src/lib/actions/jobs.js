"use server";
const baseUrl = process.env.SERVER_BASE_URL;
export const newJobPost = async (job) => {
  const res = await fetch(`${baseUrl}/new/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  return res.json();
};
