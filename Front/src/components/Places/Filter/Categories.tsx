// @flow 
import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filterState } from '../Map';
import { TSubCategory } from '../Types';
type CategoriesProps = {

};
type CategoryProps = {
  subCategory: TSubCategory
};

export const Category = ({subCategory}: CategoryProps) => {
  const setFilter = useSetRecoilState(filterState);
  const handleCategoryClick = () => {
    setFilter((prevFilter)=>{
      return {
        ...prevFilter,
        selectedCategories: prevFilter.selectedCategories.map((prevCategories)=>prevCategories.category !== subCategory.category),
      }
    })
  }
  return (
    <span className="border-2 rounded-full p-2">
      {subCategory.category}
    </span>
  );
};

export const Categories = (props: CategoriesProps) => {
  const { selectedCategories } = useRecoilValue(filterState);
  return (
    <div className="w-full overflow-x-scroll space-x-2 whitespace-nowrap p-2 my-2">
      {selectedCategories.map((data)=><Category key={data.category} subCategory={data}/>)}
    </div>
  );
};
