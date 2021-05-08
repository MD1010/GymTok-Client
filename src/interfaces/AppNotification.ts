import { IPost } from "./Post";

export interface INotification {
  _id: string;
  title: string;
  body: string;
  date: Date;
  data: IPost;
  isRead: boolean;
  notifiedUsers: string[];
}
