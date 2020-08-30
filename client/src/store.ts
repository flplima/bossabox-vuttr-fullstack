import { atom } from "recoil";

export const modalAddIsOpenState = atom({
  key: "modalAddIsOpenState",
  default: false,
});

export const modalRemoveIsOpenState = atom({
  key: "modalRemoveIsOpenState",
  default: false,
});
