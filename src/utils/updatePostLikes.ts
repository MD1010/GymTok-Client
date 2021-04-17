import { IPost } from "../interfaces";

export function getPostsAfterUserLikePost(posts: IPost[], postId: string, userId: string) {
    const postsCopy = [...posts];
    const likedPost = postsCopy.find(post => post._id === postId);
    if (likedPost) {
        likedPost.likes.push(userId);
        return postsCopy;
    }
}

export function getPostsAfterUserRemoveLikeFromPost(posts: IPost[], postId: string, userId: string) {
    const postsCopy = [...posts];
    const postToRemoveUserLike = postsCopy.find(post => post._id === postId);
    if (postToRemoveUserLike) {
        postToRemoveUserLike.likes = postToRemoveUserLike.likes.filter(likedUser => likedUser !== userId);
        return postsCopy;
    }
}