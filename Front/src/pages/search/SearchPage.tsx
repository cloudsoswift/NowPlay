import styled from "styled-components";
import Search from "../../components/SearchPage/Search";
import { NavLink, Routes, Route } from "react-router-dom";

const SearchPage = () => {
  return (
    <SearchBox>
      <Search />
    </SearchBox>
  );
};

export default SearchPage;

const SearchBox = styled.div`
  > hr {
    margin-inline: 16px;
  }
`;
