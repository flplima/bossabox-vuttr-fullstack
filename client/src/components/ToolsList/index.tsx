import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useSetRecoilState, useRecoilState } from "recoil";
import Highlighter from "react-highlight-words";
import { motion, AnimatePresence } from "framer-motion";

import {
  ToolItem,
  ToolDescription,
  ButtonRemove,
  ToolTitle,
  TagLink,
  ToolsPlaceholder,
} from "./styles";
import { fetcher } from "../../services/api";
import {
  toolToRemoveState,
  searchQueryState,
  searchTagsOnlyState,
} from "../../store/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Tool } from "../../types";

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
  const { data } = useSWR<Tool[]>(`/tools/${queryParams}`, fetcher);

  const onClickRemoveTool = (tool: Tool) => () => {
    setToolToRemove(tool);
  };

  const onClickTag = (tag: string) => () => {
    setSearchTagsOnly(true);
    setSearchQuery(tag);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={data?.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {data?.length === 0 && (
          <ToolsPlaceholder>No tools found.</ToolsPlaceholder>
        )}
        {data?.map((tool) => (
          <ToolItem key={tool.id}>
            {tool.link ? (
              <a href={tool.link} target="_blank" rel="noopener noreferrer">
                <ToolTitle>
                  <Highlighter
                    searchWords={searchTagsOnly ? [] : [searchQuery]}
                    autoEscape={true}
                    textToHighlight={tool.title}
                  />
                </ToolTitle>
              </a>
            ) : (
              <ToolTitle>
                <Highlighter
                  searchWords={searchTagsOnly ? [] : [searchQuery]}
                  autoEscape={true}
                  textToHighlight={tool.title}
                />
              </ToolTitle>
            )}
            <ButtonRemove onClick={onClickRemoveTool(tool)}>
              <FontAwesomeIcon icon={faTimes} />
              <span>remove</span>
            </ButtonRemove>
            <ToolDescription>
              <Highlighter
                searchWords={searchTagsOnly ? [] : [searchQuery]}
                autoEscape={true}
                textToHighlight={tool.description}
              />
            </ToolDescription>
            <span>
              {tool.tags.map((tag) => (
                <TagLink onClick={onClickTag(tag)}>
                  <Highlighter
                    key={tag}
                    searchWords={[searchQuery]}
                    autoEscape={true}
                    textToHighlight={`#${tag}`}
                  />
                </TagLink>
              ))}
            </span>
          </ToolItem>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ToolsList;
