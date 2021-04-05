import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, Text, View } from "react-native";
import { IChallenge } from "../../interfaces";
import { Loader } from "../shared";
import { Colors, UIConsts } from "../shared/styles/variables";
import { Challenge } from "./Challenge";

interface ChallengesListDisplayProps {
  challenges: IChallenge[];
  getChallenges: () => any;
  hasToLoadMore: boolean;
  // currentIndexVideo?: number;
}

export const ChallengesListDisplay: React.FC<ChallengesListDisplayProps> = memo(
  ({ challenges, hasToLoadMore, getChallenges }) => {
    const navigation = useNavigation();
    const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState(false);
    const scrollEnded = useRef<boolean>(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const [showFooter, setShowFooter] = useState(false);

    const [currentVideos, setCurrentVideos] = useState([]);
    useEffect(() => {
      // console.log("challenges fetched", challenges.length);
      // challenges.length hasMoreToLoad
      // console.log("!!@#!@#!@2!", challenges.length);
      // console.log("use effect", currentVideos);
      // setCurrentVideos(challenges.slice(0, 3));
      setShowFooter(false);
      // console.log("footer set");
    }, [challenges]);

    useEffect(() => {
      console.log("WJAT", scrollEnded.current);
    }, [scrollEnded.current]);

    // console.log("after footer set");
    const onViewRef = useRef(({ viewableItems }) => {
      // change playing video only after user stop dragging
      // console.log(viewableItems);
      // scrollEnded.current && console.log("switch!");
      // console.log("playing", viewableItems[0]?.index);
      scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
    });

    const goIndex = (index: number) => {
      flatListRef.current.scrollToIndex({ animated: false, index: index });
    };

    const renderItem = ({ item, index }) => {
      return <Challenge challenge={item} isVideoPlaying={index === currentlyPlaying} />;
    };

    const beginDarg = () => {
      scrollEnded.current = false;
      console.log("begin drag");
      // console.log("before", challenges.length);
      // currentlyPlaying === 2 && challenges.push(...challenges.slice(0, 3));
      // challenges.slice(0, 2);
    };
    const endDrag = () => {
      scrollEnded.current = true;
      console.log("end drag");
    };
    console.log("render!!!!");
    const onScrollEndDrag = () => {
      scrollEnded.current = true;
    };

    const keyExtractor = useCallback((challenge, i) => {
      return i.toString();
      // return challenge._id;
    }, []);

    const snapToInterval = useMemo(() => Dimensions.get("window").height - UIConsts.bottomNavbarHeight, []);
    // const getItemLayout = (data, index) => ({
    //   length: Dimensions.get("window").height - UIConsts.bottomNavbarHeight,
    //   offset: (Dimensions.get("window").height - UIConsts.bottomNavbarHeight) * index,
    //   index,
    // });

    // useEffect(() => {
    //   console.log("footer has to dissapear!");
    // }, [isNewDataFetched]);
    const config = useRef({
      itemVisiblePercentThreshold: 10,
    });

    const Footer = () => {
      if (challenges.length) {
        if (hasToLoadMore) {
          return <Loader style={{ height: 100, width: 100 }} />;
        } else {
          return <Text style={{ color: Colors.lightGrey2, fontSize: 15 }}>You have reached the end</Text>;
        }
      }
      return null;
    };

    const handleLoadMore = () => {
      setShowFooter(true);
      hasToLoadMore && getChallenges();
    };
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          // onScroll={(e) => {
          //   let offset = e.nativeEvent.contentOffset.y;
          //   let index = Math.floor(+(offset / Dimensions.get("window").height - StatusBar.currentHeight - 60));
          //   console.log("index", index);
          // }}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
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
          viewabilityConfig={config.current}
          onScrollEndDrag={endDrag}
          onScrollBeginDrag={beginDarg}
          // onEndReached={(info) => !scrollEnded.current && currentlyPlaying === 2 && goIndex(0)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={showFooter ? <Footer /> : null}
          ListFooterComponentStyle={{
            height: 80,
            backgroundColor: Colors.darkBlueOpaque,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></FlatList>

        {/* {showFooter && <Footer />} */}
      </View>
    );
  }
);
