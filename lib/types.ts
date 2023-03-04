export interface tweetType {
  description: string;
  image: string | null;
  user_id: number;
  user: userType;
  id: number;
  post_reactions: postReactionType[];
}

export interface postReactionType {
  post_id: number;
  user_id: number;
  user : userType
}

export interface userType {
  user_name: string;
  email: string;
}
