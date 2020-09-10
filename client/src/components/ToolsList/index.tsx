import React from "react";
import Highlighter from "react-highlight-words";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { Tool } from "../../types";

import {
  ToolItem,
  ToolDescription,
  ButtonRemove,
  ToolTitle,
  TagLink,
  ToolsPlaceholder,
} from "./styles";

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
import { useFetchTools } from "./hooks";

const ToolsList: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(searchQuerySelector);
  const searchTagsOnly = useSelector(searchTagsOnlySelector);

  const tools = useFetchTools();

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
        key={tools?.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {tools?.length === 0 && (
          <ToolsPlaceholder>No tools found.</ToolsPlaceholder>
        )}
        {tools?.map((tool) => (
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
                <TagLink key={tag} onClick={onClickTag(tag)}>
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
