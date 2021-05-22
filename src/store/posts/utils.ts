import { IPost } from "../../interfaces";

export const getNumberOfPosts = (posts: IPost[], isReply: boolean) => {
  return posts.filter((post) => post.isReply == isReply).length;
};
