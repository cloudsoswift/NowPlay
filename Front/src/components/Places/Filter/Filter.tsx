import * as React from "react";
import { ImCross } from "react-icons/im";
import { BusinessTimeSelector } from "./BusinessTimeSelector";
import { Categories } from "./Categories";
import { DistanceSlider } from "./DistanceSlider";
import { SelectableCategories } from "./SelectableCategories";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import styled, { keyframes } from "styled-components";

type Props = {
  className: string;
  onClose: (set: boolean) => void;
  isFilterShown: boolean;
  isModalShown: boolean;
};
export const Filter = ({
  className,
  onClose,
  isFilterShown,
  isModalShown,
}: Props) => {
  const handleApplyFilter = () => {
    const query = `
    query film($filmID: ID!){
      f1: film(filmID: $filmID) {
        ...F
        created
        director
        edited
        episodeID
        openingCrawl
        producers
        releaseDate
      }
      f2: film(filmID: $filmID) {
        ...F
      }
    }
    fragment F on Film {
      id
      title
    }
    `;
    const variables = {
      filmID: 1,
    };
    axios
      .post(
        "https://swapi-graphql.netlify.app/.netlify/functions/index",
        {
          query,
          variables,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <FilterModalBox>
      <FilterModalContent isModalShown={isModalShown}>
        {/* <motion.div
          key="filter"
          className={`${className} box`}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        > */}
        <Categories />
        <SelectableCategories />
        <DistanceSlider />
        {/* <BusinessTimeSelector /> */}
        <ButtonArea onClick={handleApplyFilter}>적용</ButtonArea>
        {/* </motion.div> */}
      </FilterModalContent>
      <FilterBackdrop
        onClick={(e: React.MouseEvent) => {
          onClose(false);
        }}
      />
    </FilterModalBox>
  );
};

const SlideDown = keyframes`
  from{transform:translateY(-500px)}
  to{transform:translateY(-42px)}
`;

const SlideUp = keyframes`
  from{transform:translateY(-42px)}
  to{transform:translateY(-500px)}
`;

const FilterModalBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  overflow-y: auto;
`;

const FilterModalContent = styled.dialog<{ isModalShown: boolean }>`
  width: 100%;
  overflow-x: hidden;
  top: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 0px 0px 10px 10px;
  box-sizing: border-box;
  background-color: var(--gray-color-light);
  z-index: 10000;
  animation-name: ${(props) => (!props.isModalShown ? SlideUp : SlideDown)};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

const FilterBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ButtonArea = styled.div`
  margin: 15px auto;
  text-align: center;
  width: 80%;
  height: 40px;
  background-color: var(--primary-color);
  font-size: var(--title-2);
  color: var(--body-color);
  line-height: 43px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px gray;
`;
