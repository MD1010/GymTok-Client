import React from "react";
import { FlatList } from "react-native-gesture-handler";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

interface Props {
  isHorizontal: boolean;
  numOfColumns: number;
}

export const PostsSkeleton: React.FC<Props> = ({ isHorizontal, numOfColumns }) => {
  return (
    <FlatList
      data={Array.from(Array(100).keys())}
      keyExtractor={(item, index) => index.toString()}
      horizontal={isHorizontal}
      numColumns={!isHorizontal ? numOfColumns : 0}
      renderItem={() => (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item flexDirection="column" margin={5}>
              <SkeletonPlaceholder.Item width={60} height={60} />
              <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} marginTop={2} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
    />
  );
};
