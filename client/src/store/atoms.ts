import { atom } from "recoil";
import { Tool } from "../types";

export const modalAddIsOpenState = atom({
  key: "modalAddIsOpenState",
  default: false,
});

export const toolToRemoveState = atom<Tool | null>({
  key: "toolToRemoveState",
  default: null,
});

export const searchQueryState = atom<string>({
  key: "searchQueryState",
  default: "",
});

export const searchTagsOnlyState = atom<boolean>({
  key: "searchTagsOnlyState",
  default: false,
});
