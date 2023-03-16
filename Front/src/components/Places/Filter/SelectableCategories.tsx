import { useRecoilValue } from "recoil";
import { filterState } from "../Map";
import type { TMainCategory } from "../Map";
type sCategoryProps = {
  category: TMainCategory,
};
export const SelectableCategory = (props: sCategoryProps) => {
  const handleSelectCategory = () => {

  }
  return (
    <div>

    </div>
  );
};

type sCategoriesProps = {
  
};
export const SelectableCategories = (props: sCategoriesProps) => {
  const { categories } = useRecoilValue(filterState);
  return (
    <div className="bg-white border-4">
      {categories.map((category)=>{
        return <SelectableCategories category={category}/>
      })}
    </div>
  );
};