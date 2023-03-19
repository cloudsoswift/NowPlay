import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterState } from "../Map";
import { TFilter, TMainCategory, TSubCategory } from "../Types";
type sCategoryProps = {
  category: TMainCategory | TSubCategory;
  onClick: Function;
  id: number;
};
type subCategoryList = {
  id: number;
  subCategories: Array<TSubCategory>;
};
// SubCategory인지 MainCategory인지 판별하는 Type Guard
const instanceOfMainCategory = (arg: any): arg is TMainCategory => {
  return arg.subCategory !== undefined;
};
export const SelectableCategory = ({
  category,
  id,
  onClick,
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
                (subC) => subC.category === category.category
              )
            : [...prevFilter.selectedCategories, category],
        };
      });
    }
  };
  return (
    <div
      onClick={handleSelectCategory}
      className={isMainCategory ? "text-center" : ""}
    >
      <img src={`/svg/${category.imageURL}`} className={isMainCategory ? "w-[20vw] m-0" : "w-[10vw]"}/>
      {category.category}
    </div>
  );
};

type sCategoriesProps = {};
export const SelectableCategories = (props: sCategoriesProps) => {
  const [{ categories }, setFilter] = useRecoilState(filterState);
  const [subCategories, setSubcategories] = useState<subCategoryList>();
  useEffect(() => {
    console.log(subCategories);
  }, [subCategories]);
  return (
    <div className="bg-white border-4 grid grid-cols-3">
      {categories.map((category, index) => {
        return (index + 1) % 3 !== 0 ? (
          <SelectableCategory
            key={index}
            id={index}
            category={category}
            onClick={setSubcategories}
          />
        ) : (
          <>
            <SelectableCategory
              key={index}
              id={index}
              category={category}
              onClick={setSubcategories}
            />
            {subCategories?.id != undefined &&
              Math.floor(subCategories.id / 3) === Math.floor(index / 3) && (
                <div className="col-span-3 grid grid-cols-3">
                  {subCategories?.subCategories.map((sbC, i) => {
                    return (
                      <SelectableCategory
                        key={i}
                        id={i}
                        category={sbC}
                        onClick={setFilter}
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
