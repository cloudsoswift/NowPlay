import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import React, { PropsWithChildren, useState, useEffect } from "react";

interface SearchBarType {
  innerPlaceHolder: string;
  searchId: string
  valueText: React.Dispatch<React.SetStateAction<string>>
  submit: () => void
}

const Search = ({ innerPlaceHolder, searchId, submit, valueText, children }: PropsWithChildren<SearchBarType>) => {
  const onChangeSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueText(e.target.value)
  }
  
  return (
    <SearchBar>
      <SearchBarInput id={searchId} placeholder={innerPlaceHolder} onChange={onChangeSubmit} />
      <button onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          submit()
        }}>
        <BiSearch />
      </button>
    </SearchBar>
  );
};

export default Search;

const SearchBar = styled.form`
  display: flex;
  border: 0;
  border-radius: 150px;
  padding-left: 10px;
  background-color: var(--gray-color-light);
  margin: 20px auto;
  width: 80%;
  height: 45px;
  position: relative;
  border: 0;
  > button {
    margin: auto 15px;
  }
  box-shadow: 2px 2px 2px gray;
`;

const SearchBarInput = styled.input`
  margin-left: 10px;
  background-color: var(--gray-color-light);
  width: 100%;
  height: 100%;
  outline: none;
  font-size: var(--body-text);
`;
