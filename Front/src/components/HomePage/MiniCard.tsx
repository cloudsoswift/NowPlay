import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { categoriesSelector } from "../Places/Map";
import { Link } from "react-router-dom";

interface Mini {
  idx: number;
  name: string;
  distance: number;
  thisRating: number;
  imagesUrl: string;
  subCategory: string;
}

const MiniCard = ({
  idx,
  name,
  distance,
  thisRating,
  imagesUrl,
  subCategory,
}: Mini) => {
  const categories = useRecoilValue(categoriesSelector);
  let subImg: string | undefined;

  categories.map((main) => {
    if (
      main.subcategories?.find((c) => c.subcategory === subCategory)
        ?.subcategoryImageUrl !== undefined
    ) {
      subImg = main.subcategories?.find(
        (c) => c.subcategory === subCategory
      )?.subcategoryImageUrl;
    }
  });

  const imgDefault = imagesUrl !== "" ? imagesUrl : subImg;
  
  const percentRating = thisRating * 20;
  return (
    <Link to={`/mobile/places/${idx}`}>
      <CardBox>
        <img src={imgDefault} />
        <div>
          <Top>
            <Name>{name}</Name>
            <Distance>
              {distance < 1
                ? `${(distance * 1000).toFixed(0)}m`
                : `${distance.toFixed(2)}km`}
            </Distance>
          </Top>
          <Bottom>
            <Small>{thisRating}</Small>
            <StarRating>
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
            </StarRating>
          </Bottom>
        </div>
      </CardBox>
    </Link>
  );
};

export default MiniCard;

const CardBox = styled.div`
  width: 200px;
  margin-inline: 16px;
  > img {
    width: 170px;
    height: 140px;
    border-radius: 20px;
    margin: 10px auto;
  }
  > div {
    margin-bottom: 16px;
  }
`;

const StarRating = styled.div`
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

const Name = styled.div`
  width: auto;
  font-size: var(--title-2);
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Distance = styled.div`
  font-size: var(--caption);
  margin-inline: 5px;
  color: var(--primary-color);
`;

const Small = styled.div`
  font-size: var(--body-text);
  margin-inline: 5px;
  width: 35px;
`;

const Top = styled.div`
  height: 30px;
  justify-content: space-between;
  display: flex;
  margin-inline: 10px;
  align-items: baseline;
`;

const Bottom = styled.div`
  justify-content: start;
  display: flex;
  margin-inline: 10px;
  align-items: baseline;
`;
