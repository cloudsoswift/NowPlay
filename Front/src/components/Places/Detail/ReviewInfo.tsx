import { useInfiniteQuery } from "@tanstack/react-query";
import { AiFillStar } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../../utils/api/api";
import { PopupImage } from "../PopupImage";
import { TOwnerComment, TReview } from "../Types";
import { useRef, useEffect, forwardRef, Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../../utils/recoil/userAtom";
import { Menu, Transition } from "@headlessui/react";
import { BiDotsHorizontal, BiDotsVertical } from "react-icons/bi";

type ReviewProps = {
  review: TReview;
  isEditable: boolean;
  refetch: Function;
  ownerComment: TOwnerComment
};
type ExpandableMenuProps = {
  id: number
  refetch: Function
};

const ExpandableMenu = ({id, refetch} : ExpandableMenuProps) => {
  const navigate = useNavigate();
  const handleClickDelete = () => {
    api.delete(`/spring/places/${id}/reviews`).then((response)=>{
      switch(response.status){
        case 200:
          alert('리뷰를 삭제했습니다.');
          refetch();
        default:
          alert('서버와 통신에 실패했습니다');
        }
      }).catch((e)=>{
      alert('서버와 통신에 실패했습니다');
    })
  }
  const handleClickModify = () => {
    navigate(`/mobile/places/${id}/review`, {state:{
      mode: "MODIFY",
      idx: id
    }});
  }
  return (
      <Menu as="div" className="absolute top-2 right-2">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <BiDotsHorizontal />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-[20vw] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  className={` group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={handleClickModify}
                >
                  수정
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                    className={` group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleClickDelete}
                  >
                  삭제
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
)}


export const Review = ({ review, isEditable, refetch }: ReviewProps) => {
  const date = new Date(review.createdAt);
  const dateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
  return (
    <div className="relative border p-4 w-full h-[30vh] shadow-sm">
      <div>
        <span className="text-lg">{review.writer?.nickname}</span>{" "}
        <span className="text-sm">{dateString}</span>{" "}
        <span>
          <AiFillStar className="inline text-[var(--primary-color)]" />
          {review.rating}
        </span>
      </div>
      <div className="flex w-full h-[20vh] space-x-2 flex-col">
        {/* <img src={review.imageURL} alt="" className="max-h-[20vh]" /> */}
        <PopupImage
          imageURL={review.reviewImageUrl}
          imageClass="max-h-[15vh] w-full object-cover"
        />
        <ReviewBox>{review.content}</ReviewBox>
      </div>
      { isEditable && <ExpandableMenu id={review.idx} refetch={refetch}/> }
    </div>
  );
};

export const ReviewInfo = forwardRef((props: ReviewInfoProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { id } = useParams();
  const {userNickname} = useRecoilValue(userInfoAtom);
  const fetchReviewList = async ({ pageParam = 0 }) => {
    const {data} = await api.get(`places/${id}/reviews?page=${pageParam}`);
    return data;
  };
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, refetch } = useInfiniteQuery({
    queryKey: ["getReviewList"],
    queryFn: fetchReviewList,
    getNextPageParam: (lastPage, pages)=> lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
  });
  console.log(data, hasNextPage, isFetching, isFetchingNextPage, status);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const handleTouchEnd = (e: TouchEvent) => {
      if(ref && typeof ref !== 'function'){
        if(ref.current?.scrollHeight === ref.current!.scrollTop + ref.current!.clientHeight){
          fetchNextPage();
        }
      }
    }
    if(ref && typeof ref !== 'function' && ref.current){
      ref.current.addEventListener("touchend", handleTouchEnd);
    } return ()=>{
      if(ref && typeof ref !== 'function' && ref.current ){
      ref?.current?.removeEventListener("touchend", handleTouchEnd);
      }
    }
  }, [ref])
  return (
    <div className="h-full overflow-y-scroll" ref={contentRef}>
      <Link
        to={"review"}
        className="grid h-14 w-full border rounded-xl shadow-sm my-2 justify-items-center items-center"
      >
        <div className="text-xl">
          <HiPencilAlt className="inline text-[var(--primary-color)] text-xl" />{" "}
          글 등록
        </div>
      </Link>
      <div className="space-y-4">
        {data?.pages?.at(0)?.content == false && <div>리뷰가 없습니다...</div>}
        {data?.pages.map((page) => (
          page?.content?.map((reviewList: Array<any>)=>{
            const ReviewData: TReview = reviewList.at(0);
            const {reviewImageUrl} = reviewList.at(1) !== null ? reviewList.at(1) : {reviewImageUrl: ""};
            const ownerComment: TOwnerComment = reviewList.at(2) !== null ? reviewList.at(2) : undefined;
            const review = {
              ...ReviewData,
              reviewImageUrl
            }
            return <Review key={ReviewData.idx} review={review} isEditable={userNickname === review.writer?.nickname} refetch={refetch} ownerComment={ownerComment}/>
          }
        )))}
      </div>
    </div>
  );
});

const ReviewBox = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
