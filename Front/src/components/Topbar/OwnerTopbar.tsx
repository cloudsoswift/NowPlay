import { useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { BsBellFill } from "react-icons/bs";

import { useOwnerLogout } from "../../utils/hooks/useOwnerLogout";
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../utils/recoil/userAtom';

const OwnerTopbar = () => {
  const ownerInfo = useRecoilValue(userInfoAtom)

  const logoutMutation = useOwnerLogout();

  const logoutHandler = () => {
    logoutMutation.mutate();
  };

  const [Cookie] = useCookies(["accessToken"]);

  const [openPop, setOpenPop] = useState(false);

  const popHandler = () => {
    setOpenPop((prev) => !prev);
  };

  return (
    <>
      <TopbarContainer>
        {Cookie.accessToken !== undefined ? (
          <>
            <h1>{ownerInfo.userName || "이름없음"}사장님 환영합니다</h1>
            <ButtonSet>
              <AlarmPopover>
                <button onClick={popHandler}>
                  <BsBellFill />
                </button>
                {openPop && (
                  <>
                  <ul className='popcontent'>
                    <li>알람 1</li>
                    <li>알람 2</li>
                    <li>알람 3</li>
                  </ul>
                  <div className='popback' onClick={popHandler}></div>
                  </>
                )}
              </AlarmPopover>
              <button onClick={logoutHandler}>로그아웃</button>
            </ButtonSet>
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
  justify-content: space-between;
  height: 70px;
  width: calc(100vw - 240px);
  top: 0;
  left: 240px;
  padding-right: 20px;

  z-index: 1;

  background-color: var(--desk-body-color);

  h1 {
    margin-left: 10px;
    font-size: var(--large-text);
  }
`;

const ButtonSet = styled.div`
  display: flex;
  align-items: center;

  > button {
    background-color: var(--primary-color);
    border-radius: 10px;
    padding: 10px;
    margin-right: 20px;
    margin-left: 20px;
    color: var(--body-color);

    transition: all 0.3s ease;
    > svg {
      font-size: var(--large-text);
    }

    &:hover {
      background-color: var(--primary-color-on);
      scale: 1.1;
    }

    &:active {
      scale: 1;
    }
  }
`;

const AlarmPopover = styled.div`
  position: relative;
  button {
    background-color: var(--body-color);
    border-radius: 10px;
    padding: 10px;
    color: var(--primary-color);

    transition: all 0.3s ease;

    > svg {
      font-size: var(--large-text);
    }

    &:hover {
      background-color: var(--primary-color-on);
      color: var(--body-color);
      scale: 1.1;
    }

    &:active {
      scale: 1;
    }

    &::after {
      background-color: var(--primary-color);
      width: 20px;
      height: 20px;
      border-radius: 100%;
      color: var(--body-color);
      content: "2";
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .popcontent {
    position: absolute;
    top: 60px;
    left: -250px;
    height: fit-content;
    width: 300px;

    background-color: var(--body-color);
    border-radius: 10px;

    z-index: 12;

    li {
      margin: 20px;

      border-bottom: 1px solid var(--primary-color);

      font-size: var(--title-2);
    }
  }
  .popback {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top:0;
      left: 0;

      z-index: 11;
    }
`;
