import styled from "styled-components";
import Search from "../../components/SearchPage/Search";
import { useState } from 'react'

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>("")
  const searchTest = () => {
    console.log(searchText)
  }

  return (
    <SearchBox>
      <Search innerPlaceHolder="가게이름을 검색하세요"  searchId="id" submit={searchTest} valueText={setSearchText}/>
    </SearchBox>
  );
};

export default SearchPage;

const SearchBox = styled.div`
  > hr {
    margin-inline: 16px;
  }
`;
