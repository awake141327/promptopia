import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const dynamic = "force-static";

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts.reverse()), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control":
          "private, no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (e) {
    console.log(e);
    return new Response("Failed to get all prompts.", { status: 500 });
  }
};
