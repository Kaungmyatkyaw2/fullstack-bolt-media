export interface tweetType {
  description: string;
  image: string | null;
  user_id: number;
  user: userType;
  id: number;
}

export interface userType {
  user_name: string;
  email: string;
}
