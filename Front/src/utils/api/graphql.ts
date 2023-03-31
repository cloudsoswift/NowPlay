export const QGetNearbyStoreList = 
`query NearbyStoreList($condition: NearbyStoreInput) {
  getNearbyStoreList(nearbyConditions: $condition) {
    storeOutput {
      store {
        idx
        name
        subcategory {
          subcategory
        }
        address
      }
      distance
      reviewCount
      averageRating
      isBookmark
    }
    totalCount
  }
}`

export const QSearchStore = 
`query searchStore($input: String, $count: Int) {
  searchStore(searchInput: $input, count: $count) {
    stores {
      idx
      name
      subcategory {
        subcategory
      }
      address
      distance
      reviewCount
      averageRating
      isBookmark
    }
    totalCount
  }
}
`

export const QStoreDetailUser =
`
query storeDetail($storeID: ID!) {
  storeDetail(storeID: $storeID) {
    name
    subcategory
    address
    distance
    reviewCount
    averageRating
    isBookmark
    contactNumber
    homepage
    mainImagesUrl
    imageUrls
    explanation
    latitude
    longitude
    isClosedOnHolidays
    businessHours {
      dayOfWeek
      openAt
      closeAt
      reservationInterval
      isDayOff
    }
  }
}
`

export const QGetRecommendStores = 
`query getRecommendStores($latitude: Float, $longitude: Float) {
  getRecommendByPosition(latitude: $latitude, longitude: $longitude) {
    stores {
      ...storesField
    }
  }
  getRecommendByCategory() {
    stores {
      ...storesField
    }
  }
}
fragment storesField on StoreSummary {
  idx
  name
  subcategory
  address
  distance
  reviewCount
  averageRating
  isBookmark
}
`


// getFavoriteStoreList():
// getNearbyStoreList(nearbyConditions: NearbyStoreInput): output
// getRecommendByPosition(latitude: Float, longitude: Float): output
// getRecommendByCategory(): output
// searchStore(searchInput: String, count: Int): output
// storeDetail(storeID: ID!): Store

type TNearbyStoreInput = {
  mainHobby: [String]
  subcategory: [String]
  latitude: number
  longitude: number
  maxDistance: number
  // afterHour: String // 시간을 "18:00" 와 같은 형태의 문자열.
  count: number // 페이징 카운트
}
// idx: ID!
// name: String
// subcategory: String
// address: String
// distance: Float
// reviewCount: Int
// averageRating: Int
// isBookmark: Boolean
// owner: String
// contactNumber: String
// homepage: String
// mainImagesUrl: String # 메인 이미지 ( Store 테이블 )
// imageUrls: [String] # 서브 이미지 ( StoreImage 테이블 )
// explanation: String
// latitude: Float
// longitude: FloatbusinessHourList
// isClosedOnHolidays: Boolean
// businessHours: [BusinessHour]

interface TStore implements StoreSummary {
  idx: number 
  // owner: User 
  name: string 
  mainCategory: THobbyMain 
  subcategory: THobbySubcategory 
  address: string 
  contactNumber: string 
  homepage: string 
  imagesUrl: string 
  explanation: string 
  latitude: number 
  longitude: number 
  isClosedOnHolidays: boolean
}

interface TStoreSummary {
  idx: number
  name: string  
  subcategory : THobbySubcategory
  address: string
}
type THobbyMain = {
  idx: number;
  mainCategory: string;
  mainImageUrl: string;
} 

type THobbySubcategory = {
  idx: number;
  mainCategory: THobbyMain;
  subcategory: string
  subcategoryImageUrl: string;
}

type TBusinessHour = {
  idx: number;
  store: TStore;
  dayOfWeek: string;
  openAt: string;
  closeAt: string;
  reservationInterval: string;
  isDayOff: boolean;
}

interface TStoreOutput {
  store: TStore
  distance: number
  reviewCount: number
  averageRating: number
  isBookmark: boolean
}

type TStoreOutputWithTotalCount = {
  storeOutput: [TStoreOutput]
  totalCount: number
}

export type { TNearbyStoreInput, TStore, TStoreSummary, THobbyMain, THobbySubcategory, TStoreOutput, TStoreOutputWithTotalCount } 