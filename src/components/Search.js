import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import styled from "styled-components";
import { motion } from "framer-motion";
import Loader from "./Loader";

import getSearchResults from "src/services/getSearchResults";
import SubmissionObject from "./Homepage/SubmissionObject";

const SearchContainer = styled.div``;

const LoadingContainer = styled.div`
  margin: 100px 0;
`;

const SearchResultsContainer = styled.div``;

const NoResultsContainer = styled.div`
  margin: 100px 0;
  color: #fff;
  font-weight: bold;
`;

function Search({ searchTerm, setRemoveZIndex }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [searchValue] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    requestSearchResults();
  }, [searchValue]);

  useEffect(() => {
    setLoading(true);
  }, [searchTerm]);

  async function requestSearchResults() {
    setLoading(true);
    const { data, error, errorMessage } = await getSearchResults(
      searchTerm.replaceAll(" ", "&")
    );
    if (error) {
      console.warn(errorMessage);
    } else {
      setResults(data);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <SearchContainer>
      {loading ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : (
        <>
          {results.length === 0 ? (
            <NoResultsContainer>
              Please don't panic, but no results were found.
            </NoResultsContainer>
          ) : (
            <SearchResultsContainer>
              {results.map((result, i) => {
                if (!result.flagged) {
                  return (
                    <SubmissionObject
                      key={i}
                      id={result.id}
                      submitter={result.submitter}
                      messageContent={result.message_content}
                      flagged={result.flagged}
                      setRemoveZIndex={setRemoveZIndex}
                      isVideo={result.isVideo}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </SearchResultsContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
}

export default Search;
