import { IChallenge } from "./Challenge";
import { IUser } from "./User";

export interface IReply {
  _id: string;
  creationTime: string;
  name: string;
  challengeId: IChallenge;
  replierId: IUser;
  description: string;
  video: string;
  gif: string;
}
