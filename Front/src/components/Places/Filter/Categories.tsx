// @flow
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filterState } from "../Map";
import { RxCross2 } from "react-icons/rx";
import { THobbySubCategory } from "../../../utils/api/graphql";
import { preparedFilterState } from "./Filter";
type CategoriesProps = {};
type CategoryProps = {
  subCategory: THobbySubCategory;
};

export const Category = ({ subCategory }: CategoryProps) => {
  const setFilter = useSetRecoilState(preparedFilterState);
  const handleCategoryClick = () => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        subcategory: prevFilter.subcategory.filter(
          (prevCategories) => prevCategories.subcategory !== subCategory.subcategory
        ),
      };
    });
  };
  return (
    <div className="mx-2 border-2 rounded-full p-2 inline border-[var(--primary-color)]"  onClick={handleCategoryClick} >
      <span className="text-[var(--primary-color)]" >
        {subCategory.subcategory}
      </span>
      <button type="button" className="align-middle text-[var(--primary-color)]"><RxCross2 /></button>
    </div>
  );
};

export const Categories = (props: CategoriesProps) => {
  const { subcategory } = useRecoilValue(preparedFilterState);

  const CategoryBox = subcategory.length === 0 ? (
    <div className="mx-4 text-[var(--gray-color)] text-[20px]">
      카테고리를 선택하여 주세요.
    </div>
  ) : (
    <>
      {subcategory.map((data) => (
        <Category key={data.subcategory} subCategory={data} />
      ))}
    </>
  )

  return (
    <div className="w-full h-[50px] overflow-x-auto space-x-2 whitespace-nowrap p-2">
      {CategoryBox}
    </div>
  );
};
