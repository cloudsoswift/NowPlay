import {FaArrowRight} from 'react-icons/fa'
import styled from 'styled-components';

const CustomerService = () => {
    const noContentAlert = () => {
        alert("아직 구현중입니다...")
    }

  return (
      <ServiceList>
        <div onClick={noContentAlert}><span>공지사항</span><FaArrowRight /></div>
        <div onClick={noContentAlert}><span>1:1 문의</span><FaArrowRight /></div>
        <div onClick={noContentAlert}><span>건의 사항</span><FaArrowRight /></div>
      </ServiceList>
  );
};

export default CustomerService;

const ServiceList = styled.div`
    display: flex;
    flex-direction: column;
    

    > div {
        margin: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    span {
        font-size: var(--title-1);
    }

    svg {
        font-size: var(--title-1);
        color: var(--primary-color)
    }
`