import { IPost } from "../interfaces";

export function userPressLikeOnPost(posts: IPost[], post: IPost, userId: string) {
  if (post.likes.includes(userId)) {
    const updatedPosts = userDislikePost(posts, post._id, userId);
    return updatedPosts;
  } else {
    console.log("LIKE");

    const updatedPosts = userLikePost(posts, post._id, userId);
    return updatedPosts;
  }
}

export function userLikePost(posts: IPost[], postId: string, userId: string) {
  // const postsCopy = [...posts];
  // const likedPost = postsCopy.find((post) => post._id === postId);
  // if (likedPost) {
  //   likedPost.likes = likedPost.likes.concat(userId);
  //   return postsCopy;
  return posts.map((x) => (x._id === postId ? { ...x, likes: [...x.likes, userId] } : x));
  // }
}

export function userDislikePost(posts: IPost[], postId: string, userId: string) {
  // const postsCopy = [...posts];
  // const postToRemoveUserLike = postsCopy.find((post) => post._id === postId);
  // if (postToRemoveUserLike) {
  //   postToRemoveUserLike.likes = postToRemoveUserLike.likes.filter((likedUser) => likedUser !== userId);
  //   return postsCopy;
  // }
  return posts.map((x) => (x._id === postId ? { ...x, likes: x.likes.filter((id) => id !== userId) } : x));
}
