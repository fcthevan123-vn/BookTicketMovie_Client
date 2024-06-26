export interface ResData {
  statusCode: number;
  message: string;
  data?: unknown;
}

export interface ResDataNormal {
  statusCode: number;
  message: string;
  data?: Record<string, unknown>;
}

export type movieHallProps = {
  name: string;
  number: number;
  RoomType: Record<string, unknown>;
  Layout: Record<string, unknown>;
};

export type layoutType = {
  name: string;
  rows: number;
  seatsPerRow: number;
};

export type RoomType = {
  id: string;
  priceMultiplier: string;
  priceNormal: number[];
  priceHoliday: number[];
  name: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
};

export type SeatStatus = {
  id: string;
  name: string;
  isBooked: boolean;
  seatId: string;
  Seat: SeatTS;
  showId: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewTS = {
  id?: string;
  userId?: string;
  movieId?: string;
  star: number;
  User?: UserTS;
  Movie?: MovieTS;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SeatType = {
  id: string;
  name: string;
  price: number;
  cinemaId: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type SeatTS = {
  createdAt: string;
  id: string;
  layoutId: string;
  name: string;
  rowNumber: number;
  seatNumber: number;
  seatTypeId: string;
  updatedAt: string;
  // SeatStatuses: SeatStatus[];
  SeatType: SeatType;
};

export type Layout = {
  id: string;
  name: string;
  rows: number;
  seatsPerRow: number;
  cinemaId: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  Seats?: SeatTS[];
};

export type MovieHall = {
  id: string;
  number: number;
  name: string;
  roomTypeId: string;
  status: string;
  cinemaId: string;
  layoutId: string;
  createdAt: string;
  updatedAt: string;
  RoomType: RoomType;
  Layout: Layout;
  Cinema: Cinema;
};

export type Show = {
  id: string;
  movieId: string;
  date: string;
  movieHallId: string;
  startTime: Date;
  endTime: Date;
  createdAt: string;
  updatedAt: string;
  MovieHall?: MovieHall;
  Movie?: MovieTS;
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
};

export type Cinema = {
  id?: string;
  name: string;
  location?: string[];
  detailLocation: string;
  RoomTypes?: RoomType[];
  Layouts?: Layout[];
  userId: string;
  User?: UserTS;
  status: string;
  locationName: string;
  hotline: string;
  SeatTypes?: SeatType[];
  image?: string;
  imageFile?: File | null;
  city?: string | null;
  district?: string | null;
  ward?: string | null;
  createdAt?: string;
  updatedAt?: string;
  MovieHalls?: MovieHall[];
};

export type Data = {
  cinema: Cinema;
  allShows: Show[];
};

export type MenuFoodTS = {
  id?: string;
  name: string;
  image: string;
  status: string;
  price: number;
  imageFile?: File | null;
  OrderFoods?: OrderFoodTS[];
};

export type OrderFoodTS = {
  id?: string;
  quantity: number;
  totalPrice: number;
  menuFoodId: string;
  MenuFood?: MenuFoodTS;
};

export type SeatOverView = {
  id: string;
  movieId: string;
  date: string;
  movieHallId: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  MovieHall: MovieHall;
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
  Movie?: MovieTS;
};

export type MovieTS = {
  id?: string;
  title: string;
  description: string;
  directors: string[];
  averageRating: number;
  actors: string[];
  language: string;
  discountId?: string | null;
  Discount?: DiscountTS;
  Shows?: Show[];
  country: string;
  subtitle: string;
  releaseDate: string;
  endDate: string;
  images?: string[];
  genre: string[];
  duration: number;
  trailerLink?: string;
  ageRequire: number;
  countBooked?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type UserTS = {
  id: string;
  fullName: string;
  email: string;
  Cinema?: Cinema;
  isVerifyEmail: boolean;
  phone: string;
  address: string;
  count: number;
  sex: number;
  age: number;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type BookingTypeTS = {
  id: string;
  userId: string;
  User?: UserTS;
  date: Date;
  Staff?: UserTS;
  staffId: string;
  showId: string;
  totalPrice: number;
  paymentMethod: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  Show: Show;
  SeatStatuses: SeatStatus[];
};

export type EventTS = {
  id?: string;
  content: string;
  discount: string | null;
  title: string;
  discountId?: string | null;
  Discount?: DiscountTS;
  thumbnail?: string;
  imageFile?: File | null;
  startDate: Date;
  endDate: Date;
  createdAt?: string;
  updatedAt?: string;
};

export interface DiscountTS {
  id?: string;
  nameDiscount: string;
  percentDiscount: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface DataSelectOfMovieTS {
  genre: string[];
  country: string[];
}

export interface NotificationTS {
  id?: string;
  userId: string;
  User?: UserTS;
  title: string;
  message: string;
  linkNotification: string;
  typeNotification: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
