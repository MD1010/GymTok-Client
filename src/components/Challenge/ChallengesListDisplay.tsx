import { useNavigation } from "@react-navigation/native";
import { cloneDeep, uniqueId } from "lodash";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, View, Text } from "react-native";
import { IChallenge } from "../../interfaces";
import { UIConsts } from "../shared/styles/variables";
import { Challenge } from "./Challenge";
import { v4 as uuidv4 } from "uuid";

interface ChallengesListDisplayProps {
  challenges: IChallenge[];
  // getChallenges: () => any;
  // currentIndexVideo?: number;
}

export const ChallengesListDisplay: React.FC<ChallengesListDisplayProps> = memo(({ challenges }) => {
  const navigation = useNavigation();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState(false);
  const scrollEnded = useRef<boolean>(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const [currentVideos, setCurrentVideos] = useState([]);
  useEffect(() => {
    console.log("challenges changes!!!");
    // console.log("!!@#!@#!@2!", challenges.length);
    // console.log("use effect", currentVideos);
    // setCurrentVideos(challenges.slice(0, 3));
  }, [challenges]);

  // useEffect(() => {
  //   navigation.addListener("blur", () => {
  //     setNavigatedOutOfScreen(true);
  //   });
  //   navigation.addListener("focus", () => {
  //     setNavigatedOutOfScreen(false);
  //   });

  //   return () => {
  //     navigation.removeListener("blur", null);
  //     navigation.removeListener("focus", null);
  //   };
  // }, [navigation]);

  // useEffect(() => {
  //   console.log("scrolling!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //   if (challenges.length > 0) {
  //     goIndex(currentIndexVideo);
  //   }
  // }, [challenges, currentIndexVideo]);

  // track view changes in order to control when video is starting to play
  // useEffect(() => {
  //   // if (currentlyPlaying === currentVideos.length - 1) {
  //   //   damog();
  //   // }
  //   // if (currentlyPlaying) {
  //   //   setCurrentVideos(challenges.slice(currentlyPlaying, currentlyPlaying + currentVideos.length));
  //   //   goIndex(0);
  //   // }
  //   // if (currentlyPlaying === 2) {
  //   //   let temp = currentVideos;
  //   //   temp.shift();
  //   //   setCurrentVideos(temp);
  //   // }
  //   // console.log("leng", challenges.length);
  //   // currentlyPlaying && setCurrentVideos([...currentVideos, ...challenges.slice(0, 5)]);
  // }, [currentlyPlaying]);

  // const damog = () => {
  //   let temp = currentVideos;

  //   // console.log("challenges in view ref", challenges.length);
  //   // console.log("index 3", challenges[3]);
  //   temp.push(challenges[3]);
  //   console.log(":temp:", temp);
  //   setCurrentVideos(temp);
  // };
  const onViewRef = useRef(({ viewableItems }) => {
    // change playing video only after user stop dragging

    console.log("playing", viewableItems[0]?.index);

    // scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  const goIndex = (index: number) => {
    flatListRef.current.scrollToIndex({ animated: false, index: index });
  };

  const renderItem = ({ item, index }) => {
    // console.log("rendering item!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // return (
    //   <View>
    //     <Text>asdasd</Text>
    //   </View>
    // );
    return <Challenge challenge={item} isVideoPlaying={false} />;
  };

  // ) : null;
  // };

  const beginDarg = () => {
    scrollEnded.current = false;
    // console.log("before", challenges.length);
    // currentlyPlaying === 2 && challenges.push(...challenges.slice(0, 3));
    // challenges.slice(0, 2);
  };
  console.log("render!!!!");
  const onScrollEndDrag = useCallback(() => {
    scrollEnded.current = true;
  }, []);

  const keyExtractor = useCallback((challenge, i) => {
    return challenge._id;
  }, []);

  const snapToInterval = useMemo(() => Dimensions.get("window").height - UIConsts.bottomNavbarHeight, []);
  // const getItemLayout = (data, index) => ({
  //   length: Dimensions.get("window").height - UIConsts.bottomNavbarHeight,
  //   offset: (Dimensions.get("window").height - UIConsts.bottomNavbarHeight) * index,
  //   index,
  // });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        windowSize={9}
        data={challenges}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={snapToInterval}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        // getItemLayout={getItemLayout}
        // onScrollToIndexFailed={() => alert("no such index")}
        onViewableItemsChanged={onViewRef.current}
        // onScrollEndDrag={() => (scrollEnded.current = true)}
        // onScrollBeginDrag={beginDarg}

        // onEndReached={(info) => !scrollEnded.current && currentlyPlaying === 2 && goIndex(0)}
        // onEndReached={getChallenges}
        // onEndReachedThreshold={3}
        // ListFooterComponent={() => (challenges.length ? <Text>Loading more..</Text> : null)}
      ></FlatList>
    </View>
  );
});
