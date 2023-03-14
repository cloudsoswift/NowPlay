import styled from "styled-components";

const Navbar = () => {
  return (
    <>
      <NavbarBox>네브바 입니다</NavbarBox>
    </>
  );
};

export default Navbar;

const NavbarBox = styled.div`
    position: fixed;
    bottom: 0px;
    height: 80px;
    width: 100vw;
    background-color: #bb2649;
    font-size: 30px;
    color: white;
`;
