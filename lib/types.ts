export interface tweetType {
  description: string;
  image: string | null;
  user_id: number;
  user: userType;
}

export interface userType {
  user_name: string;
  email: string;
}
