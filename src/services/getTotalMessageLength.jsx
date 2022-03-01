import { supabase } from "src/utils/supabaseClient";

async function getTotalMessageLength() {
  try {
    const { data, count } = await supabase
      .from("messages")
      .select("*", { count: "exact" })
      .eq("flagged", false);
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