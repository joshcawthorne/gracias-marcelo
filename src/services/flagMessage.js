import { supabase } from "src/utils/supabaseClient";

async function flagMessage({ message_id }) {
  try {
    const updates = {
      message_id: message_id,
    };
    console.log(updates);
    let { error } = await supabase.from("flagged").upsert(updates, {
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
