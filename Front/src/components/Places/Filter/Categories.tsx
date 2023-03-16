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
  const TEST_DATA = [{name: "공연장", imageSrc: "concerthall.png"}, {name: "박물관", imageSrc:"museum.png"}, {name: "미술관", imageSrc: "gallery.png"}, {name:"연극장", imageSrc:"theater"}];
  return (
    <div className="inline">
      {selectedCategories.map((data)=><Category key={data}/>)}
    </div>
  );
};
