export type Film = {
  id: number;
  title: string;
  homepage: string;
  release_date: Date;
  overview: string;
  poster_path: string;
  runtime: number;
  tagline: string;
  popularity: number;
  imdb_id: string;
  vote_average: number;
  vote_count: number;
};

export type Showing = {
  id: number;
  film_id: number;
  theater_id: number;
  showing_time: Date;
};

export type Theater = {
  id: number;
  table_number: number;
  row: number;
  column: number;
  seats: Seat[];
};

export type Seat = {
  id: number;
  seat_number: number;
  price: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  first: string;
  last: string;
  phone: string;
  email: string;
  imageUrl: string;
  creditCard: CreditCard;
  adminUser: boolean;
  isServer: boolean;
};

export type CreditCard = {
  pan: string;
  expiryMonth: number;
  expiryYear: number;
};

export type Reservation = {
  id: number;
  showing_id: number;
  seat_id: number;
  user_id: number;
  payment_key: string;
};
