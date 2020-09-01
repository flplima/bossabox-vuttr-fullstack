import React from "react";
import { Input } from "../../styles";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  modalAddIsOpenState,
  searchQueryState,
  searchTagsOnlyState,
} from "../../store/atoms";
import { Main, ButtonAdd } from "./styles";

const Toolbar: React.FC = () => {
  const setModalAddIsOpen = useSetRecoilState(modalAddIsOpenState);
  const [search, setSearch] = useRecoilState(searchQueryState);
  const [searchTagsOnly, setSearchTagsOnly] = useRecoilState(
    searchTagsOnlyState
  );
  const onClickAdd = () => {
    setModalAddIsOpen(true);
  };

  return (
    <Main>
      <Input
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="checkbox"
        checked={searchTagsOnly}
        onChange={() => setSearchTagsOnly((state) => !state)}
      />
      <span>search in tags only</span>
      <ButtonAdd onClick={onClickAdd}>+ Add</ButtonAdd>
    </Main>
  );
};

export default Toolbar;
