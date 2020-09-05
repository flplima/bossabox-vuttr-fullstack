import { Action } from "redux";
import { Tool } from "../types";

export interface AppState {
  modalAddIsOpen: boolean;
  toolToRemove: Tool | null;
  searchQuery: string;
  searchTagsOnly: boolean;
}

export enum AppActionTypes {
  OPEN_MODAL_ADD = "OPEN_MODAL_ADD",
  CLOSE_MODAL_ADD = "CLOSE_MODAL_ADD",
  SET_TOOL_TO_REMOVE = "SET_TOOL_TO_REMOVE",
  SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
  SET_SEARCH_TAGS_ONLY = "SET_SEARCH_TAGS_ONLY",
  TOGGLE_SEARCH_TAGS_ONLY = "TOGGLE_SEARCH_TAGS_ONLY",
}

export interface AppAction extends Action<AppActionTypes> {
  toolToRemove?: Tool | null;
  searchQuery?: string;
}
