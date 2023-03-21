import {useState} from "react";
type Props = {};
export const PlaceReviewWritePage = (props: Props) => {
  const reviewContent = useState("");
  const handleSubmit = (e:SubmitEvent) => {

  }
  return (
    <div className="mx-5 grid justify-center">
      <div>
        별점
      </div>     
      <div className="w-[calc(100%-2.5rem)]">
        <textarea className="w-full" />
      </div>
      <div>
        <input type="file" name="" id="" />
      </div>
      <div>
        <button className="border w-[calc(100%-2rem)] rounded-md h-10">제출</button>
      </div>
    </div>
  );
};
