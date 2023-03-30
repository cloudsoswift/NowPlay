import { useState, ChangeEvent, FormEvent } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
type Props = {};
export const PlaceReviewWritePage = (props: Props) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="grid h-[calc(100vh-122px)]">
    <form action="post" className="px-4 grid self-center space-y-5" onSubmit={handleSubmit}>
      <div className="flex [&>*>*]:text-3xl justify-center items-center">
        <button
          onClick={() => {
            setRating(1);
          }}
        >
          {rating >= 1 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button
          onClick={() => {
            setRating(2);
          }}
        >
          {rating >= 2 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button
          onClick={() => {
            setRating(3);
          }}
        >
          {rating >= 3 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button
          onClick={() => {
            setRating(4);
          }}
        >
          {rating >= 4 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button
          onClick={() => {
            setRating(5);
          }}
        >
          {rating >= 5 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        {rating} / 5
      </div>
      <div className="w-full]">
        <textarea className="w-full border" />
      </div>
      <div>
        <input type="file" name="" id="" onChange={handleImageChange} />
      </div>
      <div>
        <button className="border w-full rounded-md h-10">제출</button>
      </div>
    </form>
      
      </div>
  );
};
