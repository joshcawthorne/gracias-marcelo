import { supabase } from "src/utils/supabaseClient";

async function getSearchResults(searchTerm) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("message_content, submitter, isVideo, flagged, id")
      .textSearch("submitter", searchTerm);

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

export default getSearchResults;
