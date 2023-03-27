import styled from "styled-components";
import { useState } from "react";
// import { MyReviewCard } from "./MyReviewCard";

const MyReview = () => {
  // const [imgurls, setImgurls] = useState([
  //   "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg",
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8idYUYYOdkJoyDK7vakwW5uU7Fj9wutzFe_a7DpFY0J0CeC2-LvBWRUdqwVe3JOX7BQ&usqp=CAU",
  //   "https://e1.pxfuel.com/desktop-wallpaper/531/270/desktop-wallpaper-bayern-hintersee-lake-mountains-alps-trees-stones-dusk-germany-2880x1800-hintersee-lake-germany.jpg",
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCzSt8F6TQzWSAUqOR3x1wDrJavktUnGhagshNdpVFXGr6PIrgxz-IEIlxNAMvKn2OBHE&usqp=CAU",
  //   "https://c1.wallpaperflare.com/preview/576/54/569/hintersee-ramsau-bavaria-upper-bavaria-thumbnail.jpg",
  // ]);

  // const removeCardHandler = (url: string) => {
  //   setImgurls((prev) =>
  //     prev.filter((imgurl) => {
  //       if (imgurl === url) {
  //         return false;
  //       }
  //       return true;
  //     })
  //   );
  // };

  // const Cards = imgurls ? (
  //   imgurls.map((url, idx) => {
  //     return (
  //       <MyReviewCard
  //         url={url}
  //         idx={idx}
  //         key={url}
  //         removeCard={removeCardHandler}
  //       />
  //     );
  //   })
  // ) : (
  //   <></>
  // );

  return (
    <>
      <h1>여기는 리뷰</h1>
      <SwiperBody>
        {/* <Swiper>{Cards}</Swiper> */}
      </SwiperBody>
    </>
  );
};

export default MyReview;

const SwiperBody = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(0deg, #ff6036), #fd267a;
`;

const Swiper = styled.div`
  height: 500px;
  aspect-ratio: 2 / 3;
  perspective: 1000px;
  perspective-origin: center 50%;
  transform-style: preserve-3d;
  position: relative;
`;
