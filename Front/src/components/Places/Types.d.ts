type TFilter = {
  categories: Array<TMainCategory>,
  selectedCategories: Array<TSubCategory>,
  businessTime: string,
  distance: Number,
}
type TCategoryType = TMainCategory | TSubCategory;
type TMainCategory = {
  type: "Main"
  // id: number,
  category: string,
  imageURL: string,
  subCategory: Array<TSubCategory>
}
type TSubCategory = {
  type: "Sub"
  // id: number,
  // TMainCategory: string,
  category: string,
  imageURL: string
}

type TBusinessTime = {
    day: number,
    openTime: string,
    closeTime: string,
    reservationInterval: string
    holiday: boolean,
  }
  
  type TReview = {
    id: number,
    nickname: string,
    content: string,
    rate: number,
    created_at: Date,
    imageURL: string
  }

type TPlaceCard = {
  id: number,
  imageURL: string,
  name: string,
  subCategory: string,
  address: string,
  distance: number,
  averageRating: number,
  reviewCount: number,
  isBookmark: boolean,
}

type TPlaceDetail = TPlaceCard & {
  businessTimes: Array<TBusinessTime>,
  contactNumber: string,
  homepage: string,
  imageURLs: Array<string>,
  latitude: number,
  longitude: number,
  description: string,
  isClosedOnHolidays: boolean,
}

export type { TFilter, TMainCategory, TSubCategory, TBusinessTime, TReview, TPlaceCard, TPlaceDetail };