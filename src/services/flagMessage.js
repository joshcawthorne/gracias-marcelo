import { supabase } from "src/utils/supabaseClient";

async function flagMessage({ id }) {
  try {
    const updates = {
      id: id,
      flagged: true,
    };

    let { error } = await supabase.from("messages").upsert(updates, {
      returning: "minimal",
    });

    if (error) {
      return { error: true, errorMessage: error.message, data: null };
    } else {
      return { error: false, errorMessage: null, data: null };
    }
  } catch (error) {
    alert(error.message);
  }
}

export default flagMessage;
