// @flow 
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { filterState } from '../Map';
import { TSubCategory } from '../Types';
type CategoriesProps = {

};
type CategoryProps = {
  data: TSubCategory
};

export const Category = (props: CategoryProps) => {
  return (
    <span className="rounded-full mx-2">
      {props.data.category}
    </span>
  );
};

export const Categories = (props: CategoriesProps) => {
  const { selectedCategories } = useRecoilValue(filterState);
  return (
    <div className="w-full overflow-x-scroll">
      {selectedCategories.map((data)=><Category key={data.category} data={data}/>)}
    </div>
  );
};
