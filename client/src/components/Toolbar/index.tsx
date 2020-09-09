import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "../../styles";
import Checkbox from "../Checkbox";

import {
  Main,
  SearchContainer,
  SearchInput,
  ButtonAdd,
  SearchIcon,
  CheckboxContainer,
} from "./styles";

import {
  searchQuerySelector,
  searchTagsOnlySelector,
} from "../../store/selectors";

import {
  openModalAdd,
  toggleSearchTagsOnly,
  setSearchQuery,
} from "../../store/actions";

import searchIcon from "../../assets/search.svg";
import closeIcon from "../../assets/close.svg";

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const search = useSelector(searchQuerySelector);
  const searchTagsOnly = useSelector(searchTagsOnlySelector);

  const onClickAdd = () => {
    dispatch(openModalAdd());
  };

  const onClickSearchTagsOnly = () => {
    dispatch(toggleSearchTagsOnly());
  };

  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const clearInputSearch = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <Main>
      <SearchContainer>
        <SearchInput>
          <SearchIcon src={searchIcon} alt="search" />
          <Input
            placeholder="search"
            value={search}
            onChange={onChangeInputSearch}
          />
          {!!search.length && (
            <button onClick={clearInputSearch}>
              <img src={closeIcon} alt="close" />
            </button>
          )}
        </SearchInput>
        <CheckboxContainer>
          <Checkbox
            label="search in tags only"
            checked={searchTagsOnly}
            onClick={onClickSearchTagsOnly}
          />
        </CheckboxContainer>
      </SearchContainer>
      <ButtonAdd onClick={onClickAdd}>Add</ButtonAdd>
    </Main>
  );
};

export default Toolbar;
