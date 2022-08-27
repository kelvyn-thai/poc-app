import React from "react";

const VideoCore = (
  props: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >
) => <video muted autoPlay loop playsInline {...props} />;

export default React.memo(VideoCore);
