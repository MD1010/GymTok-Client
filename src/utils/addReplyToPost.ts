import { IPost } from "../interfaces";

export function addReplyToPost(posts: IPost[], postId: string, reply: IPost) {
    const postsCopy = [...posts];
    const replyToPost = postsCopy.find(post => post._id === postId);
    if (replyToPost) {
        replyToPost.replies.push(reply._id);
        return postsCopy;
    }
}