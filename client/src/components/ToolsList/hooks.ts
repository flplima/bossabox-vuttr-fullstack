import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

import { Tool } from "../../types";
import { fetcher } from "../../services/api";

import {
  searchQuerySelector,
  searchTagsOnlySelector,
} from "../../store/selectors";

export function useFetchTools() {
  const searchQuery = useSelector(searchQuerySelector);
  const searchTagsOnly = useSelector(searchTagsOnlySelector);
  const [debounceSearch, setDebounceSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(searchQuery);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const queryParams =
    debounceSearch && `search/${debounceSearch}?tagsOnly=${searchTagsOnly}`;

  const { data } = useSWR<Tool[]>(`/tools/${queryParams}`, fetcher);

  return data;
}
