import * as React from "react";
import { ImCross } from "react-icons/im";
import { BusinessTimeSelector } from "./BusinessTimeSelector";
import { Categories } from "./Categories";
import { DistanceSlider } from "./DistanceSlider";
import { SelectableCategories } from "./SelectableCategories";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
type Props = {
  className: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Filter = ({className, onClose}: Props) => {
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
    `
    const variables = {
      filmID: 1
    }
    axios.post("https://swapi-graphql.netlify.app/.netlify/functions/index", {
      query,
      variables
    },{
      headers:{
        "content-type": "application/json",
      }
    }).then((response)=>{
      console.log(response);
      
    })
  }
  return (
      <motion.div key="filter" className={`${className} box`} initial={{opacity:0, y: -100}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -100}}>
        <Categories />
        <SelectableCategories />
        <DistanceSlider />
        <BusinessTimeSelector />
        <div>
          <button onClick={handleApplyFilter} className="w-full border rounded-xl p-2 mt-2 text-white bg-[var(--primary-color)]">적용</button>
        </div>
        <div className="bottom-0">
          <button
            onClick={() => {
              onClose(false);
            }}
            className="mr-1 mt-1"
          >
            <ImCross />
          </button>
        </div>
      </motion.div>
  );
};
