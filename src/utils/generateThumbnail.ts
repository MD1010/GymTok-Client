import * as VideoThumbnails from "expo-video-thumbnails";

export const generateThumbnail = async (url) => {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(url, {});
    return uri;
  } catch (e) {
    console.warn(e);
  }
};
