import styled from "styled-components";

const Topbar = () => {
  return (
    <>
      <TopbarBox>뒤로</TopbarBox>
    </>
  );
};

export default Topbar;

const TopbarBox = styled.div`
    z-index: 2;
    position: fixed;
    width: 100vw;
    top: 0px;
    background-color: #EEEEEE;
    font-size: var(--title-2);
    color: var(--primary-color);
    height: 42px;
`;
