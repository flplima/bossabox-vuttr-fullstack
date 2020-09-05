import { AppState } from "./types";

export const modalAddIsOpenSelector = (state: AppState) => {
  return state.modalAddIsOpen;
};

export const toolToRemoveSelector = (state: AppState) => {
  return state.toolToRemove;
};

export const searchQuerySelector = (state: AppState) => {
  return state.searchQuery;
};

export const searchTagsOnlySelector = (state: AppState) => {
  return state.searchTagsOnly;
};
