import { supabase } from "src/utils/supabaseClient";

async function getRandomMessages() {
  try {
    const { data, error } = await supabase.from("messages").select();

    if (error) {
      return { error: true, errorMessage: error.message, data: null };
    }
    if (data) {
      const shuffled = data.sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 30);
      return {
        error: false,
        errorMessage: null,
        data: selected,
      };
    } else {
      return {
        error: true,
        errorMessage: "There has been an unknown error.",
        data: null,
      };
    }
  } catch (error) {
    alert(error.message);
  }
}

export default getRandomMessages;
