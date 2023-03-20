import { FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import api from "../../utils/api/api";

const CustomerService = () => {
  const noContentAlert = () => {
    alert("아직 구현중입니다...");
    api({
      method: "POST",
      url: "api/users/tomtom",
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const logout = () => {
    alert("로그아웃!")
  }

  return (
    <ServiceList>
      <div onClick={noContentAlert}>
        <span>공지사항</span>
        <FaArrowRight />
      </div>
      <div onClick={noContentAlert}>
        <span>1:1 문의</span>
        <FaArrowRight />
      </div>
      <div onClick={noContentAlert}>
        <span>건의 사항</span>
        <FaArrowRight />
      </div>
      <div onClick={logout}>
        <span>로그아웃</span>
        <FaArrowRight />
      </div>
    </ServiceList>
  );
};

export default CustomerService;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    margin: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-size: var(--title-1);
  }

  svg {
    font-size: var(--title-1);
    color: var(--primary-color);
  }
`;
