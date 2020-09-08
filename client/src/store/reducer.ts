import { Reducer } from "redux";
import { AppState, AppAction, AppActionTypes } from "./types";

const initialState: AppState = {
  loggedIn: Boolean(localStorage.getItem("token")),
  modalAddIsOpen: false,
  toolToRemove: null,
  searchQuery: "",
  searchTagsOnly: false,
};

const appReducer: Reducer<AppState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AppActionTypes.LOGIN:
      return {
        ...state,
        loggedIn: true,
      };

    case AppActionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };

    case AppActionTypes.OPEN_MODAL_ADD:
      return {
        ...state,
        modalAddIsOpen: true,
      };

    case AppActionTypes.CLOSE_MODAL_ADD:
      return {
        ...state,
        modalAddIsOpen: false,
      };

    case AppActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery || "",
      };

    case AppActionTypes.TOGGLE_SEARCH_TAGS_ONLY:
      return {
        ...state,
        searchTagsOnly: !state.searchTagsOnly,
      };

    case AppActionTypes.SET_SEARCH_TAGS_ONLY:
      return {
        ...state,
        searchTagsOnly: true,
      };

    case AppActionTypes.SET_TOOL_TO_REMOVE:
      return {
        ...state,
        toolToRemove: action.toolToRemove || null,
      };

    default:
      return state;
  }
};

export default appReducer;
