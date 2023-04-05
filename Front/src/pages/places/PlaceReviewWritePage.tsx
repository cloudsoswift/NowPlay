import { useState, useRef, ChangeEvent, FormEvent, FocusEvent, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api/api";
import axios from "axios";
type Props = {};


const MAX_UPLOAD_IMAGE_SIZE = 5242880; // 1024 * 1024 * 5. 5MB로 제한
const IMAGE_TYPES = ["image/png", "image/jpeg"];


export const PlaceReviewWritePage = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      for(const f of e.target.files){
        if (!IMAGE_TYPES.includes(f.type)) {
          alert("이미지는 png, jpeg, jpg 형식만 첨부할 수 있습니다.");
          fileRef.current!.value = "";
          return;
        }
        if (f.size > MAX_UPLOAD_IMAGE_SIZE) {
          alert("첨부하는 이미지는 5MB 이하여야 합니다.");
          fileRef.current!.value = "";
          return;
        }
      }
      setPreview(e.target.files[0])
    }
  };
  const setPreview = (file: any) => {
    const reader = new FileReader();
    if (!file) {
      setImageFile(file);
      setImagePreview(file);
      return;
    }
    reader.onloadend = () => {
      setImageFile(file);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

  }
  const handleContentBlur = (e:FocusEvent<HTMLTextAreaElement>)=> {
    if(e.target.value.length > 255) {
      contentRef.current!.value = contentRef.current!.value.slice(0, 255);
    }
    setContent(contentRef.current!.value);
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(!content || !rating) return;
    console.log(imageFile, content, rating, isHidden);
    const form = new FormData();
    if(imageFile){
      form.append("files", imageFile);
    }
    form.append("review", new Blob([JSON.stringify({
      content,
      rating,
      isHidden,
    })], {type: "application/json"}))
    if(location.state.mode === "MODIFY" && location.state.idx) {
      api.put(`places/${location.state.idx}/reviews`,form, {headers:{"Content-Type": undefined}})
      .then(({status})=>{
        switch(status){
          case 200:
            alert("리뷰를 수정했습니다.");
            navigate(-1);
            break;
            default:
              alert("서버와 통신에 실패했습니다.");
            }
          })
    } else {
      api.post(`places/${id}/reviews`,form, {headers:{"Content-Type": undefined}})
      .then(({status})=>{
        switch(status){
          case 200:
            alert("리뷰를 등록했습니다.");
            navigate(`/mobile/places/${location.state.store}/`);
            break;
          default:
            alert("서버와 통신에 실패했습니다.");
        }
      })
    }
  };

  useEffect(()=>{
    if(location.state?.mode && location.state.mode === "MODIFY"){
      if(location.state.idx){
        api.get(`places/${location.state.idx}/review`).then((response)=>{
          if(response.status === 200){
            return response.data;
          } else {
            return null;
          }
        }).then((data)=>{
          setContent(data.content);
          contentRef.current!.value = data.content;
          setRating(data.rating);
          setIsHidden(data.hidden);
          const loadExistImage = async() => {
            const imageURL = data.reviewImageUrlList.at(0);
            if(imageURL != null){
              const existImage = await axios.get(data.reviewImageUrlList.at(0), {responseType: 'blob'});
              console.log(existImage);
              const existImageBlob = await existImage.data;
              setPreview(new File([existImageBlob], imageURL.split('/').at(-1), { type:existImageBlob.type}))
            }
          }
          loadExistImage();
        })
      } else {
        alert("비 정상적인 접근입니다.")
        navigate(-1);
      }
    }
  }, [])

  return (
    <div className="grid h-[calc(100vh-122px)]">
    <form action="post" className="px-4 grid self-center space-y-5" onSubmit={handleSubmit}>
      <div className="flex [&>*>*]:text-3xl justify-center items-center">
        <button type="button"
          onClick={() => {
            setRating(1);
          }}
        >
          {rating >= 1 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button type="button"
          onClick={() => {
            setRating(2);
          }}
        >
          {rating >= 2 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button type="button"
          onClick={() => {
            setRating(3);
          }}
        >
          {rating >= 3 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button type="button"
          onClick={() => {
            setRating(4);
          }}
        >
          {rating >= 4 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button type="button"
          onClick={() => {
            setRating(5);
          }}
        >
          {rating >= 5 ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        {rating} / 5
      </div>
      <div className="w-full">
        <textarea className="w-full border" placeholder="리뷰 내용을 입력해주세요." onBlur={handleContentBlur} ref={contentRef}/>
        <div className="flex justify-between">
          <span>{ contentRef.current?.value.length } / 255 </span>
          <div>
            <label htmlFor="isHidden" className="mr-1">비공개</label>
            <input type="checkbox" name="" id="isHidden" onChange={()=>{setIsHidden((prevState)=>!prevState)}}/>
          </div>
        </div>
        </div>
      <div>
        <input type="file" name="" id="" multiple onChange={handleImageChange} ref={fileRef}/>
        {imagePreview && (
          <img
            className="w-full h-full object-contain"
            src={ typeof imagePreview === 'string' ? imagePreview : "" }
            alt=""
          />
        )}
      </div>
      <div>
        <button className="border w-full rounded-md h-10">제출</button>
      </div>
    </form>
  </div>
  );
};
