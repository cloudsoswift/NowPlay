import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useOwnerLogout } from "../../utils/hooks/useOwnerLogout";

const OwnerTopbar = () => {
  const logoutMutation = useOwnerLogout();

  const logoutHandler = () => {
    logoutMutation.mutate();
  };

  const [Cookie] = useCookies(["accessToken"]);
  
  return (
    <>
      {Cookie.accessToken !== undefined ? (
        <TopbarContainer>
          <div>사장님</div>
          <div>
            <button onClick={logoutHandler}>로그아웃</button>
          </div>
        </TopbarContainer>
      ) : null}
    </>
  );
};

export default OwnerTopbar;

const TopbarContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: calc(100vw - 240px);
  top: 0;
  left: 240px;

  z-index: 100;

  background-color: var(--gray-color-light);
  button {
    margin-right: 10px;
    background-color: var();
  }
`;
