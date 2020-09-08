import { AppAction, AppActionTypes } from "./types";
import { Tool } from "../types";

export const login = (): AppAction => ({
  type: AppActionTypes.LOGIN,
});

export const logout = (): AppAction => ({
  type: AppActionTypes.LOGOUT,
});

export const openModalAdd = (): AppAction => ({
  type: AppActionTypes.OPEN_MODAL_ADD,
});

export const closeModalAdd = (): AppAction => ({
  type: AppActionTypes.CLOSE_MODAL_ADD,
});

export const setSearchQuery = (searchQuery: string): AppAction => ({
  type: AppActionTypes.SET_SEARCH_QUERY,
  searchQuery,
});

export const toggleSearchTagsOnly = (): AppAction => ({
  type: AppActionTypes.TOGGLE_SEARCH_TAGS_ONLY,
});

export const setSearchTagsOnly = (): AppAction => ({
  type: AppActionTypes.SET_SEARCH_TAGS_ONLY,
});

export const setToolToRemove = (toolToRemove: Tool | null): AppAction => ({
  type: AppActionTypes.SET_TOOL_TO_REMOVE,
  toolToRemove,
});
