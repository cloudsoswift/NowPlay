import * as React from 'react';
import { Map } from '../../components/Places/Map';
type Props = {
  
};
export const PlacesPage = (props: Props) => {
  return (
    <div>
      <React.Suspense fallback={<div>...Loading</div>}>
        <Map />
      </React.Suspense>
    </div>
  );
};