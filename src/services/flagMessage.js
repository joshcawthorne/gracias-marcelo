import { supabase } from "src/utils/supabaseClient";

async function flagMessage({ id }) {
  try {
    const updates = {
      id: id,
      flagged: true,
    };

    let { data, error } = await supabase.from("messages").upsert(updates);

    if (error) {
      return { error: true, errorMessage: error.message, data: null };
    }

    if (data) {
      return { error: false, errorMessage: null, data: data };
    }
  } catch (error) {
    alert(error.message);
  }
}

export default flagMessage;
