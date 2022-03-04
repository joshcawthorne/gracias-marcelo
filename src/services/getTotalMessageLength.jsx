import { supabase } from "src/utils/supabaseClient";

async function getTotalMessageLength() {
  try {
    const { data, count } = await supabase
      .from("messages")
      .select("message_content, submitter, is_video, flagged, id", {
        count: "exact",
      });

    if (count) {
      return { error: false, errorMessage: null, data: count };
    } else {
      return { error: true, errorMessage: "Unknown Error", data: null };
    }
  } catch (error) {
    alert(error.message);
  }
}

export default getTotalMessageLength;
