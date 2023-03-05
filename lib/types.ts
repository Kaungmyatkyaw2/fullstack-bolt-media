export interface tweetType {
  description: string;
  image: string | null;
  user_id: number;
  user: userType;
  id: number;
  post_reactions: postReactionType[];
  comments: commentType[];
}

export interface postReactionType {
  post_id: number;
  user_id: number;
  user: userType;
}

export interface userType {
  user_name: string;
  email: string;
}

export interface commentType {
  user: userType;
  comment: string;
  user_id: number;
  post_id: number;
}
