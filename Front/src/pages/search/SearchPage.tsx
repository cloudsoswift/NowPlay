import styled from "styled-components";
import Search from "../../components/SearchPage/Search";
import SearchStore from "../../components/SearchPage/SearchStore";
import { useState, useEffect, useRef } from 'react'

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("")
  const [searchInput, setSearchInput] = useState<string>("")
  const searchSubmit = () => {
    setSearchInput(searchText)
    console.log(searchInput)
  }
  useEffect(() => {
    if (searchText == "") {
      setSearchInput("")
    }
  }, [searchText])

  return (
    <SearchBox>
      <Search innerPlaceHolder="가게이름을 검색하세요"  searchId="id" submit={searchSubmit} valueText={setSearchText}/>
      {searchInput !== "" && <SearchStore searchInput={searchInput} />}
    </SearchBox>
  );
};

export default SearchPage;

const SearchBox = styled.div`
  > hr {
    margin-inline: 16px;
  }
`;
