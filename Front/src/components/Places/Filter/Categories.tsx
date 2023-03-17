// @flow 
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { filterState } from '../Map';
type CategoriesProps = {

};
type CategoryProps = {
  
};

export const Category = (props: CategoryProps) => {
  return (
    <div className="rounded-full">
      카테고리
    </div>
  );
};

export const Categories = (props: CategoriesProps) => {
  const { selectedCategories } = useRecoilValue(filterState);
  return (
    <div className="inline">
      {selectedCategories.map((data)=><Category key={data.category}/>)}
    </div>
  );
};
