import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts.reverse()), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Failed to get all prompts.", { status: 500 });
  }
};
