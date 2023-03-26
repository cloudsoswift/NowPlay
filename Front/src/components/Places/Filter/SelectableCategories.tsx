import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterState } from "../Map";
import { TFilter, TMainCategory, TSubCategory } from "../Types";
type sCategoryProps = {
  category: TMainCategory | TSubCategory;
  onClick: Function;
  id: number;
  className?: string;
};
type subCategoryList = {
  id: number;
  subCategories: Array<TSubCategory>;
};
export const SelectableCategory = ({
  category,
  id,
  onClick,
  className
}: sCategoryProps) => {
  const isMainCategory = category.type === "Main";
  const handleSelectCategory = () => {
    if (isMainCategory) {
      onClick((prevSubC: subCategoryList) => {
        return prevSubC?.id === id ? {} : {
          id: id,
          subCategories: category.subCategory,
        };
      });
    } else {
      onClick((prevFilter: TFilter): TFilter => {
        return {
          ...prevFilter,
          selectedCategories: prevFilter.selectedCategories.some(
            (subC) => subC.category === category.category
          )
            ? prevFilter.selectedCategories.filter(
                (subC) => subC.category !== category.category
              )
            : [...prevFilter.selectedCategories, category],
        };
      });
    }
  };
  return (
    <div
      onClick={handleSelectCategory}
      className={ `grid text-center justify-center p-1 ${className}`}
    >
      <img src={`/svg/${category.imageURL}`} className={isMainCategory ? "h-[20vw] w-[20vw] m-0 " : "h-[10vw] w-[10vw] justify-self-center"}/>
      {category.category}
    </div>
  );
};

type sCategoriesProps = {};
const selectedCategoryClass = "border-b-2 border-b-[var(--primary-color)]";
export const SelectableCategories = (props: sCategoriesProps) => {
  const [{ categories, selectedCategories }, setFilter] = useRecoilState(filterState);
  const [subCategories, setSubcategories] = useState<subCategoryList>();
  return (
    <div className="bg-white border-2 rounded-xl p-2 grid grid-cols-3">
      {categories.map((category, index) => {
        return (index + 1) % 3 !== 0 ? (
          <SelectableCategory
            key={index}
            id={index}
            category={category}
            onClick={setSubcategories}
            className={index === subCategories?.id ? selectedCategoryClass : ""}
          />
        ) : (
          <>
            <SelectableCategory
              key={index}
              id={index}
              category={category}
              onClick={setSubcategories}
              className={index === subCategories?.id ? selectedCategoryClass : ""}
            />
            {subCategories?.id != undefined &&
              Math.floor(subCategories.id / 3) === Math.floor(index / 3) && (
                <div className="col-span-3 grid grid-cols-3 p-2">
                  {subCategories?.subCategories.map((sbC, i) => {
                    // 선택된 카테고리 리스트에 포함되어 있다면 다르게 표시
                    const isSelected = selectedCategories.some((sC)=>sC.category === sbC.category);
                    return (
                      <SelectableCategory
                        key={`${index}-${i}`}
                        id={i}
                        category={sbC}
                        onClick={setFilter}
                        className={ isSelected ? "bg-[var(--primary-color)] text-white [&>img]:invert" : ""}
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
