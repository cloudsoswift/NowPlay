export const QGetNearbyStoreList = 
`query NearbyStoreList($condition: NearbyStoreInput) {
  getNearbyStoreList(nearbyConditions: $condition) {
    stores {
      idx
      name
      subcategory
      address
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
      subcategory
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
getNearbyStoreList(nearbyConditions: NearbyStoreInput): output
getRecommendByPosition(latitude: Float, longitude: Float): output
getRecommendByCategory(): output
searchStore(searchInput: String, count: Int): output
storeDetail(storeID: ID!): Store

type output {
  stores:[StoreSummary]
  totalCount: Int
}

input NearbyStoreInput {
  mainHobby: [String]
  subcategory: [String]
  latitude: Float
  longitude: Float
  maxDistance: Int
  afterHour: String // 시간을 "18:00" 와 같은 형태의 문자열.
  count: Int # 페이징 카운트
}

type Store implements StoreSummary {
  idx: ID!
  name: String
  subcategory: String
  address: String
  distance: Float
  reviewCount: Int
  averageRating: Int
  isBookmark: Boolean
  owner: String
  contactNumber: String
  homepage: String
  mainImagesUrl: String # 메인 이미지 ( Store 테이블 )
  imageUrls: [String] # 서브 이미지 ( StoreImage 테이블 )
  explanation: String
  latitude: Float
  longitude: Float
  isClosedOnHolidays: Boolean
  businessHours: [BusinessHour]
}

type BusinessHour {
  idx: ID!
  store: String
  dayOfWeek: String
  openAt: String
  closeAt: String
  reservationInterval: String
  isDayOff: Boolean
}

interface StoreSummary {
  idx: ID!
  name: String
  subcategory: String
  address: String
  distance: Float
  reviewCount: Int
  averageRating: Int
  isBookmark: Boolean
}

