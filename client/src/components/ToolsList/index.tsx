import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useSetRecoilState, useRecoilState } from "recoil";
import Highlighter from "react-highlight-words";

import { ToolItem, ToolDescription, ButtonRemove, TagLink } from "./styles";
import { fetcher } from "../../services/api";
import {
  toolToRemoveState,
  searchQueryState,
  searchTagsOnlyState,
} from "../../store/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "../../types";

const ToolsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [searchTagsOnly, setSearchTagsOnly] = useRecoilState(
    searchTagsOnlyState
  );
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

  const onClickTag = (tag: Tag) => () => {
    setSearchTagsOnly(true);
    setSearchQuery(tag.name);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data.map((tool: any) => (
        <ToolItem key={tool.id}>
          {tool.link ? (
            <a href={tool.link} target="_blank" rel="noopener noreferrer">
              <h2>
                <Highlighter
                  searchWords={searchTagsOnly ? [] : [searchQuery]}
                  autoEscape={true}
                  textToHighlight={tool.title}
                />
              </h2>
            </a>
          ) : (
            <h2>
              <Highlighter
                searchWords={searchTagsOnly ? [] : [searchQuery]}
                autoEscape={true}
                textToHighlight={tool.title}
              />
            </h2>
          )}
          <ButtonRemove onClick={onClickRemoveTool(tool)}>
            <FontAwesomeIcon icon={faTimes} /> remove
          </ButtonRemove>
          <ToolDescription>
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={tool.description}
            />
          </ToolDescription>
          <span>
            {tool.tags.map((tag: Tag) => (
              <TagLink onClick={onClickTag(tag)}>
                <Highlighter
                  key={tag.id}
                  searchWords={[searchQuery]}
                  autoEscape={true}
                  textToHighlight={`#${tag.name}`}
                />
              </TagLink>
            ))}
          </span>
        </ToolItem>
      ))}
    </>
  );
};

export default ToolsList;
