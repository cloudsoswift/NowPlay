// @flow
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterState } from "../Map";
import { TSubCategory } from "../Types";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";


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
    <div className="mx-2 border-2 rounded-full p-2 inline border-[var(--primary-color)]"  onClick={handleCategoryClick} >
      <span className="text-[var(--primary-color)]" >
        {subCategory.category}
      </span>
      <button type="button" className="align-middle text-[var(--primary-color)]"><RxCross2 /></button>
    </div>
  );
};

export const Categories = (props: CategoriesProps) => {
  const { selectedCategories } = useRecoilValue(filterState);

  const CategoryBox = selectedCategories.length === 0 ? (
    <div className="mx-4 text-[var(--gray-color)] text-[20px]">
      카테고리를 선택하여 주세요.
    </div>
  ) : (
    <>
      {selectedCategories.map((data) => (
        <Category key={data.category} subCategory={data} />
      ))}
    </>
  )

  return (
    <div className="w-full h-[50px] overflow-x-auto space-x-2 whitespace-nowrap p-2">
      {CategoryBox}
    </div>
  );
};
