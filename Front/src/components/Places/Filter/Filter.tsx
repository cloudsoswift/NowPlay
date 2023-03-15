import * as React from 'react';
import { Categories } from './Categories';
type Props = {
  "className": string
};
export const Filter = (props: Props) => {
  return (
    <div className={props.className}>
      <Categories />
    </div>
  );
};