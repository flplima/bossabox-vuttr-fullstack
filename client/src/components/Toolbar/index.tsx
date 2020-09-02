import React from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  modalAddIsOpenState,
  searchQueryState,
  searchTagsOnlyState,
} from "../../store/atoms";
import { Input, Button } from "../../styles";
import { Main, SearchContainer, SearchInput, InputIcon } from "./styles";
import Checkbox from "../Checkbox";

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
      <SearchContainer>
        <SearchInput>
          <InputIcon icon={faSearch} />
          <Input
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {!!search.length && (
            <a onClick={() => setSearch("")}>
              <FontAwesomeIcon icon={faTimes} />
            </a>
          )}
        </SearchInput>
        <Checkbox
          label="search in tags only"
          checked={searchTagsOnly}
          onClick={() => setSearchTagsOnly((state) => !state)}
        />
      </SearchContainer>
      <Button onClick={onClickAdd}>
        <FontAwesomeIcon icon={faPlus} /> Add
      </Button>
    </Main>
  );
};

export default Toolbar;
