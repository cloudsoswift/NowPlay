import styled, { keyframes } from "styled-components";
import { useRef, MutableRefObject } from "react";
import { TinitialValues } from "../../utils/hooks/useForm";
import useHorizontalScroll from "../../utils/hooks/useHorizontalScroll";
import { FiSettings } from "react-icons/fi";
import { weekdays } from "../OwnerForm/OwnerAuthForm/OwnerAuthDescription";
import {BiMapAlt, BiBookAlt, BiCalendarCheck, BiCategoryAlt, BiCategory, BiPencil} from 'react-icons/bi'

const StoreInfo = ({values, updateHandle}: {values: TinitialValues, updateHandle:()=>void}) => {
  const imgs = values.storeBrcImages
    ? values.storeBrcImages.map((img, idx) => {
        return (
          <StoreImageCard key={idx}>
            <img src={img} draggable={false} />
          </StoreImageCard>
        );
      })
    : null;

  const scrollRef =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;

  const event = useHorizontalScroll(scrollRef);

  const daysHour = Object.keys(weekdays).map((days, idx) => {
    return (
      <div key={idx}>
        <p>{weekdays[days]}</p>
        {values.businessHour?.[days].storeHoliday ? (
          <span>"휴무일"</span>
        ) : (
          <>
          <span>OPEN : {values.businessHour?.[days].open}</span>
          <span>CLOSE : {values.businessHour?.[days].close}</span>
          <span>예약 간격 {values.businessHour?.[days].reservationInterval} 분</span>
          </>
        )}
      </div>
    );
  });

  return (
    <StoreInfoContainer>
      <StoreTitleHeader>
        {values.storeName}
        <button onClick={updateHandle}>
          <BiPencil />
        </button>
      </StoreTitleHeader>
      <StoreImageContainer {...event} ref={scrollRef}>
        {imgs}
      </StoreImageContainer>
      <StoreTextbox>
        <BiCategoryAlt />
        <p>주 카테고리</p>
        <span>{values.hobbyMainCategory}</span>
      </StoreTextbox>
      <StoreTextbox>
        <BiCategory />
        <p>부 카테고리</p>
        <span>{values.hobbyMajorCategory}</span>
      </StoreTextbox>
      <StoreTextbox>
        <BiMapAlt />
        <p>주소</p>
        <span>{values.storeAddress}</span>
      </StoreTextbox>
      <StoreTextbox>
        <BiBookAlt />
        <p>가게 설명</p>
        <span>{values.storeExplanation}</span>
      </StoreTextbox>
      <StoreTextbox>
        <BiCalendarCheck />
        <p>영업시간</p>
        {daysHour}
      </StoreTextbox>
    </StoreInfoContainer>
  );
};

export default StoreInfo;

const faidIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
  }
`

const StoreInfoContainer = styled.div`
  margin: 10px;
`;

const StoreTitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--body-color);
  border-radius: 5px;
  padding: 10px;
  padding-left: 20px;

  border-left: 20px solid var(--primary-color);

  margin-bottom: 20px;

  font-family: "LINESeedKRBd";
  font-size: var(--large-text);

  animation: ${faidIn} 1s ease;

  button {
    background-color: var(--primary-color);
    border-radius: 10px;
    padding: 10px;
    color: var(--body-color);

    transition: all 0.3s ease;
    > svg {
      font-size: var(--title-1);
    }

    &:hover {
      background-color: var(--primary-color-on);
      scale: 1.1;
    }
  }
`;

const StoreImageContainer = styled.div`
  display: flex;

  background-color: var(--body-color);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;

  cursor: grab;

  animation: ${faidIn} 1s ease;

  flex-wrap: nowrap;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoreImageCard = styled.div`
  flex: 0 0 auto;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  margin-right: 10px;
  overflow: hidden;

  animation: ${faidIn} 1s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const StoreTextbox = styled.div`
  position: relative;
  background-color: var(--body-color);
  border-radius: 5px;
  padding: 10px;

  border-left: 20px solid var(--primary-color-light);

  
  margin-bottom: 10px;

  animation: ${faidIn} 1s ease;

  p {
    margin-left: 10px;
    font-size: var(--title-2);
  }
  span {
    font-size: var(--body-text);
    margin-left: 20px;
  }
  svg {
    position: absolute;
    left: -15px;
    background-color: var(--primary-color);
    border-radius: 5px;
    height: 25px;
    width: 25px;
    color: var(--body-color);
    padding: 5px;
  }
`;

