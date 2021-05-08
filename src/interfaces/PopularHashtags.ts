import { IPost } from "./Post";

export interface IPopularHashtags {
    [hashtag: string]: [IPost]
}