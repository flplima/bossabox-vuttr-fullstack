import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Highlighter from "react-highlight-words";

import { ToolItem } from "./styles";
import { fetcher } from "../../services/api";
import {
  toolToRemoveState,
  searchQueryState,
  searchTagsOnlyState,
} from "../../store/atoms";

const ToolsList: React.FC = () => {
  const searchQuery = useRecoilValue(searchQueryState);
  const searchTagsOnly = useRecoilValue(searchTagsOnlyState);
  const setToolToRemove = useSetRecoilState(toolToRemoveState);

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
    debounceSearch && `?search=${debounceSearch}&tagsOnly=${searchTagsOnly}`;
  const { data } = useSWR(`/tools/${queryParams}`, fetcher);

  const onClickRemoveTool = (tool: any) => () => {
    setToolToRemove(tool);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data.map((tool: any) => (
        <ToolItem key={tool.id}>
          <a href={tool.link} target="_blank" rel="noopener noreferrer">
            <h2>
              <Highlighter
                searchWords={searchTagsOnly ? [] : [searchQuery]}
                autoEscape={true}
                textToHighlight={tool.title}
              />
            </h2>
          </a>
          <button onClick={onClickRemoveTool(tool)}>x remove</button>
          <p>
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={tool.description}
            />
          </p>
          <span>
            {tool.tags.map((tag: any) => (
              <Highlighter
                key={tag.id}
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={tag.name}
              />
            ))}
          </span>
        </ToolItem>
      ))}
    </>
  );
};

export default ToolsList;
