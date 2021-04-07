import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, Text, View } from "react-native";
import { IChallenge } from "../../interfaces";
import { Loader } from "../shared";
import { Colors, UIConsts } from "../shared/styles/variables";
import { Challenge } from "./Challenge";
import { PanGestureHandler } from "react-native-gesture-handler";

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

    useEffect(() => {
      setShowFooter(false);
    }, [challenges]);

    // useEffect(() => {
    //   if (challenges.length > 0) {
    //     goIndex(currentIndexVideo);
    //   }
    // }, [challenges, currentIndexVideo]);

    useFocusEffect(
      React.useCallback(() => {
        navigation.addListener("blur", () => {
          setNavigatedOutOfScreen(true);
        });
        navigation.addListener("focus", () => {
          setNavigatedOutOfScreen(false);
        });

        return () => {
          navigation.removeListener("blur", null);
          navigation.removeListener("focus", null);
        };
      }, [])
    );

    const onViewRef = useRef(({ viewableItems }) => {
      scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
    });

    const goIndex = (index: number) => {
      flatListRef.current.scrollToIndex({ animated: false, index: index });
    };

    const renderItem = ({ item, index }) => {
      return <Challenge challenge={item} isVideoPlaying={index === currentlyPlaying && !navigatedOutOfScreen} />;
    };

    const beginDarg = useCallback(() => (scrollEnded.current = false), []);
    const endDrag = useCallback(() => (scrollEnded.current = true), []);
    const keyExtractor = useCallback((challenge, i) => challenge._id, []);
    const snapToInterval = useMemo(() => Dimensions.get("window").height - UIConsts.bottomNavbarHeight, []);
    const config = useRef({
      viewAreaCoveragePercentThreshold: 100,
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
      <>
        <View style={{ flex: 1 }}>
          <FlatList
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
            onScrollToIndexFailed={() => alert("no such index")}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={config.current}
            onScrollEndDrag={endDrag}
            onScrollBeginDrag={beginDarg}
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
        </View>
      </>
    );
  }
);
