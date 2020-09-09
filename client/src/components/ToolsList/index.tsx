import React, { useState, useEffect } from "react";
import useSWR from "swr";
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

import { Tool } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  searchQuerySelector,
  searchTagsOnlySelector,
} from "../../store/selectors";
import {
  setToolToRemove,
  setSearchTagsOnly,
  setSearchQuery,
} from "../../store/actions";

import closeIcon from "../../assets/close.svg";

const ToolsList: React.FC = () => {
  const dispatch = useDispatch();
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

  const onClickRemoveTool = (tool: Tool) => () => {
    dispatch(setToolToRemove(tool));
  };

  const onClickTag = (tag: string) => () => {
    dispatch(setSearchTagsOnly());
    dispatch(setSearchQuery(tag));
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
              <img src={closeIcon} alt="Remove tool" />
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
