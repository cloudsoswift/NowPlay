import React, {useEffect, useState} from "react"

import {BiRightArrowAlt, BiLeftArrowAlt} from "react-icons/bi"

const OwnerReservePage = () => {
    const [dateInfo, setDateInfo] = useState<string>()

    useEffect(() => {
        setDateInfo(new Date().toISOString().slice(0, 10))
    }, [])

    const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateInfo(e.currentTarget.value)
    }
    
    return <>
    <div><BiLeftArrowAlt />날짜 계산 <input type="date" value={dateInfo} onChange={dateChangeHandler}/> <BiRightArrowAlt /></div>
    <div>여기는 메인 예약 박스
        <div>예약 박스 <button>승낙</button><button>거절</button></div>
        <div>예약 박스 <button>승낙</button><button>거절</button></div>
        <div>예약 박스 <button>승낙</button><button>거절</button></div>
        <div>예약 박스 <button>승낙</button><button>거절</button></div>
        <div>예약 박스 <button>승낙</button><button>거절</button></div>
        <div>예약 박스 <button>승낙</button><button>거절</button></div>
    </div>
    </>
}

export default OwnerReservePage