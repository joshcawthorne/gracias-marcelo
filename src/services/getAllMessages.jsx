import { supabase } from "src/utils/supabaseClient";

async function getAllMessages({ startPosition }) {
  console.log(startPosition);
  let endPosition = startPosition + 50;
  console.log(parseInt(endPosition));
  try {
    console.log("Starting");
    const { data } = await supabase
      .from("messages")
      .select("*")
      .range(startPosition, endPosition)
      .order("id", { ascending: true });

    console.log("Ending");
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
