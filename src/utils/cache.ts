import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import shorthash from "shorthash";
import { STREAMING_SERVER_VIDEO_ENDPOINT } from "./consts";

export const loadVideo = async (videoId: string) => {
  const serverVideoPath = `${STREAMING_SERVER_VIDEO_ENDPOINT}/${videoId}`;
  console.log("___________________________cache___________________", serverVideoPath);
  if (videoId.startsWith("file")) {
    return videoId;
  }
  const localPath = `${Platform.OS === "ios" ? FileSystem.documentDirectory : FileSystem.cacheDirectory}${
    Platform.OS === "ios" ? videoId.split("/")[3] : shorthash.unique(serverVideoPath)
  }`;
  const video = await FileSystem.getInfoAsync(localPath);
  if (video.exists) {
    console.log("uri exists is  " + video.uri);
    return video.uri;
  } else {
    console.log("downloading image to cache");
    const video = await FileSystem.downloadAsync(serverVideoPath, localPath, { cache: true });
    console.log("cache url = ", video.uri);
    return video.uri;
  }
};
