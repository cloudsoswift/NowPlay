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
    content: string,
    rate: number,
    created_at: Date,
    images_url: Array<string>
  }

type TPlaceCard = {
  name: string,
  address: string,
  contact_number: string,
  homepage: string,
  imageURL: string,
  latitude: number,
  longtitude: number,
  explanation: string,
  closeOnHolidays: boolean,
}

export type { TFilter, TMainCategory, TSubCategory, TBusinessTime, TReview, TPlaceCard };