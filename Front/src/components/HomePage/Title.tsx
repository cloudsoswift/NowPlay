import styled from "styled-components";
import React, {
  PropsWithChildren,
  useCallback,
  useState,
  useEffect,
} from "react";
import Pin2 from "../../svg/pin2.svg";
import MyLocationModal from "../../components/HomePage/MyLocationModal";

interface TitlelType {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Title = ({
  isOpenModal,
  setIsOpenModal,
  children,
}: PropsWithChildren<TitlelType>) => {
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 36.1048884, longitude: 128.4201059 });
  const [selectAddress, setSelectAddress] = useState<string>("");

  const [isOpenModalBox, setIsOpenModalBox] = useState<boolean>(false);

  const [selectLocation, setSelectLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  const onClickToggleModal = useCallback(() => {
    if (isOpenModal) {
      setIsOpenModalBox(!isOpenModalBox);
      setTimeout(() => setIsOpenModal(!isOpenModal), 500);
    } else {
      setIsOpenModalBox(!isOpenModalBox);
      setIsOpenModal(!isOpenModal);
    }
  }, [isOpenModal]);

  const findAddress = (
    latlng: naver.maps.LatLng,
    map: naver.maps.Map,
    select: React.Dispatch<React.SetStateAction<string>>
  ) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      function (
        status: naver.maps.Service.Status,
        response: naver.maps.Service.ReverseGeocodeResponse
      ) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something went wrong!");
        }
        const address = response.v2.address.roadAddress
          ? response.v2.address.roadAddress
          : response.v2.address.jibunAddress;
        select(address);
      }
    );
  };

  useEffect(() => {
    const position = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );
    const map = naver.maps.Map;
    findAddress(position, map as unknown as naver.maps.Map, setSelectAddress);
  }, []);

  return (
    <>
      {isOpenModal && (
        <MyLocationModal
          myLocation={myLocation}
          onClickToggleModal={onClickToggleModal}
          isOpenModal={isOpenModalBox}
          selectAddress={selectAddress}
          setSelectAddress={setSelectAddress}
          findAddress={findAddress}
          selectLocation={selectLocation}
          setSelectLocation={setSelectLocation}
        />
      )}
      <TitleBox onClick={onClickToggleModal}>
        <img src={Pin2} />
        <div>{selectAddress}</div>
      </TitleBox>
    </>
  );
};

export default Title;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  width: 80%;
  margin-inline: auto;
  > img {
    width: 24px;
    height: 24px;
  }
  > div {
    font-size: var(--body-text);
    margin: auto 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
