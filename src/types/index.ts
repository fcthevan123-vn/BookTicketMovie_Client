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
  name: string;
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
  createdAt: string;
  updatedAt: string;
  Seats: SeatTS[];
};

export type MovieHall = {
  id: string;
  number: number;
  name: string;
  roomTypeId: string;
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
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  MovieHall: MovieHall;
  Movie?: MovieTS;
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
};

export type Cinema = {
  id: string;
  name: string;
  location: string[];
  detailLocation: string;
  createdAt: string;
  updatedAt: string;
  MovieHalls: MovieHall[];
};

export type Data = {
  cinema: Cinema;
  allShows: Show[];
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
  id: string;
  title: string;
  description: string;
  directors: string[];
  actors: string[];
  language: string;
  country: string;
  subtitle: string;
  releaseDate: string;
  endDate: string;
  images: string[];
  genre: string[];
  duration: number;
  ageRequire: number;
  countBooked: number;
  createdAt: string;
  updatedAt: string;
};

export type UserTS = {
  id: string;
  fullName: string;
  email: string;
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
  thumbnail?: string;
  imageFile?: File | null;
  startDate: Date;
  endDate: Date;
  createdAt?: string;
  updatedAt?: string;
};
