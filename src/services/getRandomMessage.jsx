import { supabase } from "src/utils/supabaseClient";

async function getRandomMessage() {
  try {
    const { data, count } = await supabase
      .from("messages")
      .select("message_content", "submitter", "isVideo", "flagged", "id", {
        count: "exact",
      })

      .eq("flagged", false);
    if (count) {
      let random = Math.floor(Math.random() * count);
      return { error: false, errorMessage: null, data: random };
    } else {
      return { error: true, errorMessage: "Unknown Error", data: null };
    }
  } catch (error) {
    alert(error.message);
  }
}

export default getRandomMessage;
