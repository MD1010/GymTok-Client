import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const ChallangeSkeleton = () => (
  <>
    {Array.from(Array(100).keys()).map((v, i) => {
      return (
        <SkeletonPlaceholder key={i}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item flexDirection="column" margin={5}>
              <SkeletonPlaceholder.Item width={60} height={60} />
              <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} marginTop={2} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      );
    })}
  </>
);
