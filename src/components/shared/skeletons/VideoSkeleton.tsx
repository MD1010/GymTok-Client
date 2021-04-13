import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native"

export const VideoSkeleton = () => (
    <ContentLoader
        width={450}
        height={400}
        viewBox="0 0 450 400"
        backgroundColor="#f0f0f0"
        foregroundColor="#dedede"
    >
        <Rect x="" y="" width="100%" height="100%" />
    </ContentLoader>
)