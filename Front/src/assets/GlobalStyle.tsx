import { createGlobalStyle } from "styled-components";

import SpoqaHanSansNeoBold from "./fonts/SpoqaHanSansNeo-Bold.ttf";
import SpoqaHanSansNeoRegular from "./fonts/SpoqaHanSansNeo-Regular.ttf";
import SpoqaHanSansNeoThin from "./fonts/SpoqaHanSansNeo-Thin.ttf";
import SpoqaHanSansNeoMedium from "./fonts/SpoqaHanSansNeo-Medium.ttf";
import SpoqaHanSansNeoLight from "./fonts/SpoqaHanSansNeo-Light.ttf";
import LINESeedKRBd from "./fonts/LINESeedKR-Bd.woff2"
import LINESeedKRRg from "./fonts/LINESeedKR-Rg.woff2"
import LINESeedKRTh from "./fonts/LINESeedKR-Th.woff2"

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SpoqaHanSansNeoBold';
        src: local('SpoqaHanSansNeoBold'), local('SpoqaHanSansNeoBold');
        font-style: normal;
        src: url(${SpoqaHanSansNeoBold}) format('truetype');
    }
    @font-face {
        font-family: 'SpoqaHanSansNeoMedium';
        src: local('SpoqaHanSansNeoMedium'), local('SpoqaHanSansNeoMedium');
        font-style: normal;
        src: url(${SpoqaHanSansNeoMedium}) format('truetype');
    }
    @font-face {
        font-family: 'SpoqaHanSansNeoLight';
        src: local('SpoqaHanSansNeoLight'), local('SpoqaHanSansNeoLight');
        font-style: normal;
        src: url(${SpoqaHanSansNeoLight}) format('truetype');
    }
    @font-face {
        font-family: 'SpoqaHanSansNeoRegular';
        src: local('SpoqaHanSansNeoRegular'), local('SpoqaHanSansNeoRegular');
        font-style: normal;
        src: url(${SpoqaHanSansNeoRegular}) format('truetype');
    }
    @font-face {
        font-family: 'SpoqaHanSansNeoThin';
        src: local('SpoqaHanSansNeoThin'), local('SpoqaHanSansNeoThin');
        font-style: normal;
        src: url(${SpoqaHanSansNeoThin}) format('truetype');
    }
    @font-face {
        font-family: 'LINESeedKRBd';
        src: local('LINESeedKR-Bd'), local('LINESeedKR-Bd');
        font-style: normal;
        src: url(${LINESeedKRBd}) format('woff2');
    }
    @font-face {
        font-family: 'LINESeedKRRg';
        src: local('LINESeedKR-Rg'), local('LINESeedKR-Rg');
        font-style: normal;
        src: url(${LINESeedKRRg}) format('woff2');
    }
    @font-face {
        font-family: 'LINESeedKRTh';
        src: local('LINESeedKR-Th'), local('LINESeedKR-Th');
        font-style: normal;
        src: url(${LINESeedKRTh}) format('woff2');
    }

      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-size: 16px;
          font-family: 'LINESeedKRRg';
      }
  
      :root {
          /* ===== Colors ===== */
          --body-color : #fff;
          --gray-color : #888888;
          --gray-color-light: #EEEEEE;
          --primary-color : #BB2649;
          --primary-color-light : #C6637A;
          --text-color : #1A1E27;
          --text-color-light : #B1B8C0;
          --sub-color: #D6DADF;
  
          /* ===== Transition ===== */
          --trans-02 : all 0.2s ease;
          --trans-03 : all 0.3s ease;
          --trans-04 : all 0.4s ease;
          --trans-05 : all 0.5s ease;

          /* ===== Font Size ====== */
          --large-text : 30px;
          --title-1: 24px;
          --title-2: 20px;
          --body-text: 17px;
          --caption: 12px;
          --navigation-text: 12px;

          height: 100%;
      }
  
      a {
        text-decoration: none;
        color: black;
      }
`;

export default GlobalStyle;
