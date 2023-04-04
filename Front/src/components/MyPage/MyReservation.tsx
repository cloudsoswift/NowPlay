import { useMutation, useQuery } from "@tanstack/react-query";
import styled, { keyframes } from "styled-components";
import { queryClient } from "../../main";
import api from "../../utils/api/api";

const MyReservation = () => {
  const {data} = useQuery(["userReservation"], async () => {
    const { data } = await api({
      method: "GET",
      url: "/reservation/my",
    });
    return data
  });

  const removeMutation = useMutation((id: number) =>  api({method: "DELETE", url: `reservation/${id}`}), {onSuccess: () => {
    queryClient.invalidateQueries(["userReservation"])
  }})

  const rejectHandler = (idx: number) => {
    removeMutation.mutate(idx)
  }

  return (<>{data && data.length !== 0 ?
    data.map((reserve: any, index: number) => (
      <ReserveCard delay={index} key={index} accept={reserve.isConfirmed}>
        <div className='reserveInfo'>
          <div>
            <h1>예약자</h1>
            <h1>{reserve.time.slice(0, 10)}</h1>
          </div>
          <div>
            <p>{reserve.history}</p>
          </div>
        </div>
        <div>
              <button className='decline' onClick={() => rejectHandler(reserve.idx)}>예약 취소</button>
        </div>
      </ReserveCard>
    )) : <NoContentCard><img src='../../src/assets/LeisureLogo.png' /><h1>예약이 존재하지 않습니다</h1></NoContentCard>}</>);
};

export default MyReservation;

const NoContentCard = styled.div`
  height: auto;
  width: 30vw;
`

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

  padding: 10px;
  margin: 10px;
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

  .reserveInfo {
    display: flex;
    flex-direction: row;

    > div {
      margin-right: 20px;
    }
  }

  button {
    height: 50px;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;

    font-size: var(--title-2);

    color: white;

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
