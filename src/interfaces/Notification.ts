import { IPost } from "./Post";
import { IUser } from "./User";

export interface INotification {
  _id?: string;
  title: string;
  body: string;
  date?: Date;
  data: any;
  isRead?: boolean;
  sender: IUser;
  notifiedUsers?: string[];
}
