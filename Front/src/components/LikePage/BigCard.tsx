import api from "../../utils/api/api";
import styled from "styled-components";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TPlaceCard } from "../Places/Types";
import { useRecoilValue } from "recoil";
import { categoriesSelector } from "../Places/Map";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type PlaceCardProps = {
  place: TPlaceCard;
  toggleBookmark: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    number,
    unknown
  >;
};

const BigCard = ({ place, toggleBookmark }: PlaceCardProps) => {
  const categories = useRecoilValue(categoriesSelector);
  let subImg: string | undefined;

  categories.map((main) => {
    if (
      main.subcategories?.find((c) => c.subcategory === place.subCategory)
        ?.subcategoryImageUrl !== undefined
    ) {
      subImg = main.subcategories?.find(
        (c) => c.subcategory === place.subCategory
      )?.subcategoryImageUrl;
    }
  });

  const imgDefault = place.imageURL !== "" ? place.imageURL : subImg;

  const percentRating = place.averageRating * 20;

  const bookmarkHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    toggleBookmark.mutate(place.idx);
  };

  return (
    <Link to={`/mobile/places/${place.idx}`}>
      <CardBox>
        <img src={imgDefault} />
        <div>
          <Top>
            <Name>{place.name}</Name>
            <Category>{place.subCategory}</Category>
            <BookmarkDiv onClick={bookmarkHandler}>
              {place.isBookmark ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
            </BookmarkDiv>
          </Top>
          <Middle>
            <Address>{place.address}</Address>
          </Middle>
          {place.distance !== 0 && (
            <Bottom>
              <Distance>
                {place.distance < 1
                  ? `${(place.distance * 1000).toFixed(0)}m`
                  : `${place.distance.toFixed(2)}km`}
              </Distance>
              <div>/</div>
              <ReviewNum>리뷰 {place.reviewCount}개</ReviewNum>
              <div>/</div>
              <Star>
                <Small>{place.averageRating.toFixed(2)}</Small>
                <StarRatinga>
                  <StarRatingFill style={{ width: percentRating + "%" }}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </StarRatingFill>
                  <StarRatingBase>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </StarRatingBase>
                </StarRatinga>
              </Star>
            </Bottom>
          )}
        </div>
      </CardBox>
    </Link>
  );
};

export default BigCard;

const CardBox = styled.div`
  width: 100%;
  padding: 30px 30px 15px 30px;
  > img {
    margin-inline: auto;
    height: 220px;
    width: 100%;
    border-radius: 20px;
  }
  > div {
  }
  border-bottom: 10px solid var(--gray-color-light);
`;

const Top = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const Name = styled.div`
  width: auto;
  font-size: var(--large-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 15px;
`;

const Category = styled.div`
  margin-left: auto;
  width: auto;

  white-space: nowrap;
  font-size: var(--title-2);
  color: var(--gray-color);
`;

const Middle = styled.div`
  margin-top: 5px;
`;

const Address = styled.div`
  width: 100%;
  font-size: var(--body-text);
`;

const Bottom = styled.div`
  justify-content: start;
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Distance = styled.div`
  font-size: var(--caption);
  margin-inline: 10px;
  color: var(--primary-color);
`;

const ReviewNum = styled.div`
  margin-inline: 10px;
`;

const Star = styled.div`
  margin-inline: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Small = styled.div`
  font-size: var(--body-text);
  margin-right: 5px;
`;

const StarRatinga = styled.div`
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: #2b2a29;
`;

const StarRatingFill = styled.div`
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: var(--primary-color);
  > span {
    font-size: var(--title-2);
  }
`;

const StarRatingBase = styled.div`
  z-index: 0;
  padding: 0;
  > span {
    font-size: var(--title-2);
  }
`;

const BookmarkDiv = styled.div`
  margin-left: 5px;
  margin-bottom: 5px;
  > svg {
    width: 30px;
    height: 30px;
    fill: var(--primary-color);
  }
`;
