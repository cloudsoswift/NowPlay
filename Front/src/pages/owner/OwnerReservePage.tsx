import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import styled, { keyframes } from "styled-components";
import { queryClient } from '../../main';
import { ownerapi } from "../../utils/api/api";

const OwnerReservePage = () => {
  // useDateInfo??
  const [dateInfo, setDateInfo] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInfo(e.currentTarget.value);
  };

  const dayHandler = (type: "plus" | "minus") => {
    const today = new Date(dateInfo);
    if (type === "plus") {
      today.setDate(today.getDate() + 1);
    } else {
      today.setDate(today.getDate() - 1);
    }
    setDateInfo(today.toISOString().slice(0, 10));
  };

  const { data } = useQuery([`storeReservation${dateInfo}`], async () => {
    const { data } = await ownerapi({
      method: "GET",
      url: `reservation/store/1/date?reservationDate=${dateInfo}`,
    });
    return data;
  });

  const confirmMutation = useMutation((id: number) =>  ownerapi({method: "PUT", url: `reservation/${id}/confirm`}), {onSuccess: () => {
    queryClient.invalidateQueries([`storeReservation${dateInfo}`])
  }})

  const rejectMutation = useMutation((id: number) => ownerapi({method: "PUT", url: `reservation/${id}/reject`}), {onSuccess: () => {
    queryClient.invalidateQueries([`storeReservation${dateInfo}`])
  }})

  const confirmHandler = (id: number) => {
    confirmMutation.mutate(id)
  }

  const rejectHandler = (id: number) => {
    rejectMutation.mutate(id)
  }

  return (
    <>
      <DateHeader>
        <BiLeftArrowAlt onClick={() => dayHandler("minus")} />
        예약 날짜{" "}
        <input type='date' value={dateInfo} onChange={dateChangeHandler} />
        <BiRightArrowAlt onClick={() => dayHandler("plus")} />
      </DateHeader>
      <DateBody>
        {data &&
          data.map((reserve: any, index: number) => (
            <ReserveCard delay={index} key={index} accept={reserve.isConfirmed}>
              <div className='reserveInfo'>
                {reserve.isConfirmed !== 0 ? (
                  <div className='checkbox'>
                    {reserve.isConfirmed === 1 ? "✔" : "❌"}
                  </div>
                ) : null}
                <div>
                  <h1>예약자</h1>
                  <h1>{reserve.time}</h1>
                </div>
                <div>
                  <p>{reserve.history}</p>
                </div>
              </div>
              <div>
                {reserve.isConfirmed === 0 && (
                  <>
                    <button className='accept' onClick={() => confirmHandler(reserve.idx)}>승낙</button>
                    <button className='decline' onClick={() => rejectHandler(reserve.idx)}>거절</button>
                  </>
                )}
              </div>
            </ReserveCard>
          ))}
      </DateBody>
    </>
  );
};

export default OwnerReservePage;

const DateHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  margin-bottom: 10px;

  background-color: var(--body-color);
  border-radius: 10px;
  border-left: 20px solid var(--primary-color);
  border-right: 20px solid var(--primary-color);

  font-size: var(--title-1);
  transition: 0.5s all;

  svg {
    height: var(--large-text);
    width: var(--large-text);

    font-size: var(--title-1);
    background-color: var(--primary-color);
    border-radius: 100%;
    color: var(--body-color);

    transition: 0.5s all;

    cursor: pointer;

    &:hover {
      scale: 1.2;
    }

    &:active {
      scale: 1;
    }
  }
`;

const DateBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  min-height: calc(90vh - 130px);

  background-color: var(--body-color);
  border-radius: 10px;
  border-left: 20px solid var(--primary-color-light);
  border-right: 20px solid var(--primary-color-light);
`;

const openCard = keyframes`
    0% {
        width: 0;
        opacity: 0;
        color: transparent;
    }

    
    100% {
        width: calc(100% - 40px);
        opacity: 1;
    }
`;

const slideUp = keyframes`
    0% {
      transform: translateY(0);
    }
  
    100% {
      transform: translateY(-0.5rem);
    }
  `;

const ReserveCard = styled.div<{ delay: number; accept: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: 0;

  height: 80px;

  padding: 20px;
  margin: 20px;
  border: solid 2px ${(props) => {
    if (props.accept === 0) {
      return "var(--primary-color-light)";
    } else if (props.accept === 1) {
      return "#31d731";
    } else {
      return "red";
    }
  }};
  border-radius: 10px;

  animation: ${openCard} 2s forwards;
  animation-delay: ${(props) => `0.${props.delay}s`};

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    border: 5px solid var(--text-color);
    border-radius: 100%;

    color: var(--text-color);

    font-size: var(--title-2);
  }

  .reserveInfo {
    display: flex;
    flex-direction: row;

    > div {
      margin-right: 20px;
    }
  }

  button {
    height: 50px;
    width: 100px;
    margin: 10px;
    border-radius: 10px;

    font-size: var(--title-2);

    transition: all 500ms ease;

    &:hover {
      animation: ${slideUp} 0.5s ease forwards;
    }
  }

  .accept {
    border: 2px solid #31d731;
    color: #31d731;

    &:hover {
      color: white;
      background: linear-gradient(to left, #31d731 50%, white 50%);
      background-position: 100%;
      background-size: 200% 100%;
    }
  }

  .decline {
    border: 2px solid red;
    color: red;

    &:hover {
      color: white;
      background: linear-gradient(to left, red 50%, white 50%);
      background-position: 100%;
      background-size: 200% 100%;
    }
  }
`;
