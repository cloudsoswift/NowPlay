import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesSelector, filterState } from "../Map";
import { TFilter, THobbyMainCategory, THobbySubCategory } from "../../../utils/api/graphql";
import { preparedFilterState } from "./Filter";

type sCategoryProps = {
  category: THobbyMainCategory | THobbySubCategory;
  onClick: Function;
  id: number;
  className?: string;
};
type subCategoryList = {
  id: number;
  subCategories: Array<THobbySubCategory>;
};
const isMainCategory = (arg: any): arg is THobbyMainCategory => {
  return arg.subcategories !== undefined;
}
export const SelectableCategory = ({
  category,
  id,
  onClick,
  className,
}: sCategoryProps) => {
  const handleSelectCategory = () => {
    if (isMainCategory(category)) {
      onClick((prevSubC: subCategoryList) => {
        return prevSubC?.id === id ? {} : {
          id: id,
          subCategories: category.subcategories,
        };
      });
    } else {
      onClick((prevFilter: TFilter): TFilter => {
        return {
          ...prevFilter,
          subcategory: prevFilter.subcategory.some(
            (subC) => subC.subcategory === category.subcategory
          )
            ? prevFilter.subcategory.filter(
                (subC) => subC.subcategory !== category.subcategory
              )
            : [...prevFilter.subcategory, category],
        };
      });
    }
  };
  return (
    <div
      onClick={handleSelectCategory}
      className={`grid text-center justify-center p-1 ${className} transition-all duration-300`}
    >
      { isMainCategory(category) ? (
        <>

          <img src={category.mainImageUrl} className="h-[20vw] w-[20vw] mt-1"/>
          {(category as THobbyMainCategory).mainCategory}
        </>
      ) : (
        <>
          <img src={(category as THobbySubCategory).subcategoryImageUrl} className="h-[10vw] w-[10vw] justify-self-center mt-2"/>
          {(category as THobbySubCategory).subcategory}
        </>
        )}
    </div>
  );
};

type sCategoriesProps = {};
const unSelectedCategoryClass =
  "bg-[var(--body-color)] m-1 border-b-4 border-b-[var(--body-color)]";
const selectedCategoryClass =
  "bg-[var(--body-color)] m-1 border-b-4 border-b-[var(--primary-color)]";

export const SelectableCategories = (props: sCategoriesProps) => {
  const [ {subcategory}, setFilter] = useRecoilState(preparedFilterState);
  const [subCategories, setSubcategories] = useState<subCategoryList>();
  const categoryList = useRecoilValue(categoriesSelector);


  return (
    <div className="w-full p-1 grid grid-cols-3">
      {categoryList.map((category, index) => {
        return (index + 1) % 3 !== 0 ? (
          <SelectableCategory
            key={index}
            id={index}
            category={category}
            onClick={setSubcategories}
            className={
              index === subCategories?.id
                ? selectedCategoryClass
                : unSelectedCategoryClass
            }
          />
        ) : (
          <>
            <SelectableCategory
              key={index}
              id={index}
              category={category}
              onClick={setSubcategories}
              className={
                index === subCategories?.id
                  ? selectedCategoryClass
                  : unSelectedCategoryClass
              }
            />
            {subCategories?.id !== undefined &&
              Math.floor(subCategories.id / 3) === Math.floor(index / 3) && (
                <div className="col-span-3 grid grid-cols-3">
                  {subCategories?.subCategories.map((sbC, i) => {
                    // 선택된 카테고리 리스트에 포함되어 있다면 다르게 표시
                    const isSelected = subcategory.some((sC)=>sC.subcategory === sbC.subcategory);
                    return (
                      <SelectableCategory
                        key={`${index}-${i}`}
                        id={i}
                        category={sbC}
                        onClick={setFilter}
                        className={
                          isSelected
                            ? "m-1 bg-[var(--primary-color)] text-white [&>img]:invert transition-color"
                            : "m-1"
                        }
                      />
                    );
                  })}
                </div>
              )}
          </>
        );
      })}
    </div>
  );
};
