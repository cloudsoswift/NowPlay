export const ReverseGeocode = (latlng: naver.maps.LatLng, map: naver.maps.Map) => {
  naver.maps.Service.reverseGeocode(
    {
      coords: latlng,
      orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(','),
    },
    function (
      status: naver.maps.Service.Status,
      response: naver.maps.Service.ReverseGeocodeResponse,
    ) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert('Something went wrong!');
      }
      const address = response.v2.address.roadAddress
      ? response.v2.address.roadAddress
      : response.v2.address.jibunAddress;

    },
  );
};
