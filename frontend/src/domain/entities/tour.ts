export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  location: {
    name: string;
    country: string;
  };
  // images: string[];
  imageUrl:
    | {
        uri: string;
      }
    | number;
  rating: number;
  reviews: Review[];
  price: number;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
}
