export type Leaderboard = {
  _id: string;
  creator: string;
  name: string;
  uid: string;
  participants: string[];
};

export type Participant = {
  _id: string;
  name: string;
  points: number;
  leaderboard: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  sub: string;
  avatar: string;
  leaderboards: string;
};
