import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { filterState } from "../Map";
import { TMainCategory, TSubCategory } from "../Types";
type sCategoryProps = {
  category: TMainCategory;
  onClick: Function;
  id: number;
};
type subCategoryList = {
  id: number;
  subCategories: Array<TSubCategory>;
};
export const SelectableCategory = (props: sCategoryProps) => {
  const handleSelectCategory = () => {
    props.onClick({
      id: props.id,
      subCategories: props.category.subCategory,
    });
  };
  return (
    <div onClick={handleSelectCategory}>
      <img src={`/svg/${props.category.imageURL}`} />
      {props.category.category}
    </div>
  );
};

type sCategoriesProps = {};
export const SelectableCategories = (props: sCategoriesProps) => {
  const { categories } = useRecoilValue(filterState);
  const [subCategories, setSubcategories] = useState<subCategoryList>();
  useEffect(() => {
    console.log(subCategories);
  }, [subCategories]);
  return (
    <div className="bg-white border-4 grid grid-cols-3">
      {categories.map((category, index) => {
        return (index + 1) % 3 !== 0 ? (
          <SelectableCategory
            id={index}
            category={category}
            onClick={setSubcategories}
          />
        ) : (
          <>
            <SelectableCategory
              id={index}
              category={category}
              onClick={setSubcategories}
            />
            {subCategories?.id != undefined &&
              Math.floor(subCategories.id / 3) === Math.floor(index / 3) && (
                <div className="col-span-3">
                  {subCategories?.subCategories.map((sbC) => {
                    return <div>{sbC.category}</div>;
                  })}
                </div>
              )}
          </>
        );
      })}
    </div>
  );
};
