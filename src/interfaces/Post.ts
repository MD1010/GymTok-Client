import { IUser } from "./User";

export interface IPost {
  _id: string;
  creationTime: string;
  name: string;
  createdBy: IUser;
  description: string;
  estimatedScore: string;
  image: string;
  video: string;
  likes: string[];
  replies: string[];
}