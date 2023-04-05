type TFilter = {
  categories: RecoilValueReadOnly<TMainCategory[]>,
  selectedCategories: Array<TSubCategory>,
  businessTime: string,
  distance: Number,
}
type TCategoryType = TMainCategory | TSubCategory;
type TMainCategory = {
  idx: number;
  mainCategory: string;
  mainImageUrl: string;
  subcategories?: Array<TSubCategory>
}
type TSubCategory = {
  idx: number;
  mainCategory: TMainCategory;
  subcategory: string;
  subcategoryImageUrl: string;
}

type TBusinessHour = {
    day: number,
    openTime: string,
    closeTime: string,
    reservationInterval: string
    holiday: boolean,
  }
  
type TReview = {
  idx: number,
  writer?: { nickname: string },
  store?: object,
  content: string,
  rating: number,
  createdAt: string,
  hidden: boolean,
  reviewImageUrl: string, 
}
type TReviewImage = {
  idx: number;
  review: TReview;
  reviewImageFileName: string;
  reviewImageUrl: string;
}
type TOwnerComment = {
  idx: number;
  review: TReview;
  createdAt: string;
  content: string;
}

type TPlaceCard = {
  idx: number,
  imageURL: string,
  name: string,
  subCategory: string,
  address: string,
  distance: number,
  averageRating: number,
  reviewCount: number,
  isBookmark: boolean,
}

// type TPlaceDetail = TPlaceCard & {
//   businessTimes: Array<TBusinessHour>,
//   contactNumber: string,
//   homepage: string,
//   imageURLs: Array<string>,
//   latitude: number,
//   longitude: number,
//   description: string,
//   isClosedOnHolidays: boolean,
// }

type TStoreDetail = {
  idx: number;
  owner: object;
  mainCategory: TMainCategory;
  subcategory: TSubCategory;
  name: string;
  address: string;
  contactNumber: string;
  homepage: string;
  imagesUrl: string;
  explanation: string;
  latitude: number;
  longitude: number;
  businessHourList: Array<TBusinessHour>;
  averageRating: number;
  closedOnHolidays: boolean;
  faverite: boolean;
}
type TPosition = {
  longitude: number,
  latitude: number,
}

export type { TFilter, TMainCategory, TSubCategory, TBusinessHour, TReview, TReviewImage, TOwnerComment, TPlaceCard, TStoreDetail, TPosition };