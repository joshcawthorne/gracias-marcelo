import { supabase } from "src/utils/supabaseClient";

async function getAllMessages({ startPosition, ascending }) {
  let endPosition = startPosition + 20;
  try {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .range(startPosition, endPosition)
      .order("id", { ascending: ascending });
    if (data) {
      return {
        error: false,
        errorMessage: null,
        data: data,
        endPosition: endPosition,
      };
    } else {
      return {
        error: true,
        errorMessage: "Unknown Error",
        data: null,
        endPosition: null,
      };
    }
  } catch (error) {
    alert(error.message);
  }
}

export default getAllMessages;
