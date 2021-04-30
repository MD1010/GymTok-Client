import { IHashtag } from "./Hashtag";
import { IUser } from "./User";

export interface IPost {
  _id: string;
  description: string;
  createdBy: IUser;
  publishDate?: Date;
  videoURI: string;
  gif: string;
  taggedUsers: string[];
  replies: string[];
  likes: string[];
  isReply: boolean;
  hashtags: IHashtag[];
}
