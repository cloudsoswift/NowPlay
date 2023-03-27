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
      <TopbarContainer>
        {Cookie.accessToken !== undefined ? (
          <>
            <div>사장님</div>
            <div>
              <button onClick={logoutHandler}>로그아웃</button>
            </div>
          </>
        ) : null}
      </TopbarContainer>
    </>
  );
};

export default OwnerTopbar;

const TopbarContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: end;
  height: 50px;
  width: calc(100vw - 240px);
  top: 0;
  left: 240px;
  padding-right: 20px;

  z-index: 1;

  background-color: var(--desk-body-color);
  button {
    margin-right: 10px;
  }
`;
