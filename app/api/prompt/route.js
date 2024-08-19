import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const search = searchParams.get("search") || "";
  const regex = new RegExp(search, "i");

  try {
    await connectToDB();

    const prompts = await Prompt.find({ prompt: { $regex: regex } }).populate(
      "creator"
    );

    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Expires: 0,
      Pragma: "no-cache",
    };

    return new Response(JSON.stringify(prompts.reverse()), {
      status: 200,
      headers,
    });
  } catch (e) {
    console.log(e);
    return new Response("Failed to get all prompts.", { status: 500 });
  }
};
