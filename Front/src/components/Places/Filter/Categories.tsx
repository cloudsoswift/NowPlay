// @flow
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterState } from "../Map";
import { TSubCategory } from "../Types";
import { RxCross2 } from "react-icons/rx";
type CategoriesProps = {};
type CategoryProps = {
  subCategory: TSubCategory;
};

export const Category = ({ subCategory }: CategoryProps) => {
  const setFilter = useSetRecoilState(filterState);
  const handleCategoryClick = () => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        selectedCategories: prevFilter.selectedCategories.filter(
          (prevCategories) => prevCategories.category !== subCategory.category
        ),
      };
    });
  };
  return (
    <div className="border-2 rounded-full p-2 inline">
      <span className="" >
        {subCategory.category}
      </span>
      <button type="button" onClick={handleCategoryClick} className="align-middle"><RxCross2 /></button>
    </div>
  );
};

export const Categories = (props: CategoriesProps) => {
  const { selectedCategories } = useRecoilValue(filterState);
  return (
    <div className="w-full overflow-x-scroll space-x-2 whitespace-nowrap p-2 my-2">
      {selectedCategories.map((data) => (
        <Category key={data.category} subCategory={data} />
      ))}
    </div>
  );
};
