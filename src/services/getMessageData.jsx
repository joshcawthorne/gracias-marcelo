import { supabase } from "src/utils/supabaseClient";

async function getRandomMessage({ id }) {
  try {
    console.log(id);
    const { data, error } = await supabase
      .from("messages")
      .select()
      .eq("id", id);
    if (error) {
      return { error: true, errorMessage: error.message, data: null };
    }
    if (data) {
      console.log(data);
      if (data.length > 0) {
        if (data[0].flagged === false) {
          return { error: false, errorMessage: null, data: data };
        } else {
          return { error: true, errorMessage: "flagged", data: null };
        }
      } else {
        return {
          error: true,
          errorMessage: "There has been an unknown error.",
          data: null,
        };
      }
    }
  } catch (error) {
    alert(error.message);
  }
}

export default getRandomMessage;
