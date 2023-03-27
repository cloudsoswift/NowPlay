import React, {useEffect, useState} from "react"

import {BiRightArrowAlt, BiLeftArrowAlt} from "react-icons/bi"
import styled, { keyframes } from "styled-components"

const OwnerReservePage = () => {
    // useDateInfo??
    const [dateInfo, setDateInfo] = useState<string>(new Date().toISOString().slice(0, 10))

    const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateInfo(e.currentTarget.value)
    }

    const dayHandler = (type: "plus" | "minus") => {
        const today = new Date(dateInfo)
        if (type === "plus") {
            today.setDate(today.getDate() + 1)
        } else {
            today.setDate(today.getDate() - 1)
        }
        setDateInfo(today.toISOString().slice(0, 10))

    }

    
    return <>
    <DateHeader>
        <BiLeftArrowAlt onClick={() => dayHandler("minus")}/>
        예약 날짜 <input type="date" value={dateInfo} onChange={dateChangeHandler}/> 
        <BiRightArrowAlt onClick={() => dayHandler("plus")}/>
    </DateHeader>
    <DateBody>
        <ReserveCard delay={0}><div>예약 정보칸</div> <div><button>승낙</button><button>거절</button></div></ReserveCard>
        <ReserveCard delay={1}><div>예약 정보칸</div> <div><button>승낙</button><button>거절</button></div></ReserveCard>
        <ReserveCard delay={2}><div>예약 정보칸</div> <div><button>승낙</button><button>거절</button></div></ReserveCard>
        <ReserveCard delay={3}><div>예약 정보칸</div> <div><button>승낙</button><button>거절</button></div></ReserveCard>
    </DateBody>
    </>
}

export default OwnerReservePage


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
`

const DateBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    min-height: calc(90vh - 130px);

    background-color: var(--body-color);
    border-radius: 10px;
    border-left: 20px solid var(--primary-color-light);
    border-right: 20px solid var(--primary-color-light);
`

const openCard = keyframes`
    0% {
        width: 0;
        opacity: 0;
    }

    
    100% {
        width: calc(100% - 40px);
    }
`

const ReserveCard = styled.div<{delay: number}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: 80px;
    

    padding: 20px;
    margin: 20px;
    border: solid 2px;

    animation: ${openCard} 2s;
    animation-delay: ${props => `0.${props.delay}s`};
`