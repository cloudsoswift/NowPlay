import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";


const Search = () => {

  return (
    <SearchBar>
      <SearchBarInput />
      <div>
        <BiSearch />
      </div>
    </SearchBar>
  );
};

export default Search;

const SearchBar = styled.div`
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
  div {
    margin: auto 15px;
  }
`;

const SearchBarInput = styled.input`
  margin-left: 10px;
  background-color: var(--gray-color-light);
  width: 100%;
  height: 100%;
  outline: none;
  font-size: var(--body-text);
`;
