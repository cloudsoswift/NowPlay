type TFilter = {
  categories: Array<TMainCategory>,
  selectedCategories: Array<TSubCategory>,
  businessTime: Date,
  distance: Number,
}
type TMainCategory = {
  id: number,
  category: string,
  imageUrl: string,
  subCategory: Array<TSubCategory>
}
type TSubCategory = {
  id: number,
  TMainCategory: string,
  category: string,
  imageUrl: string
}

type TPlaceCard = {
  name: string,
  address: string,
  contact_number: string,
  homepage: string,
  image_url: string,
  latitude: number,
  longtitude: number,
  explanation: string,
  closeOnHolidays: boolean,
}

export type { TFilter, TMainCategory, TSubCategory };