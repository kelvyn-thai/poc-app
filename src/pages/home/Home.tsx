import React from "react";
import videoIntro from "assets/videos/envision.mp4";
import Video from "components/core/Video";
import "./Home.style.scss";

const HomePage = () => (
  <div className="h-[100%] relative">
    <div className="text-3xl home-title sub-font uppercase absolute z-10 abs-center">
      MEETING THE CHALLENGES
      <br /> OF A NET ZERO FUTURE
    </div>
    <div className="video-intro relative w-[100%] h-[100%]">
      <Video
        src={videoIntro}
        className="absolute left-0 top-0 w-[100%] h-[100%] object-cover"
      />
    </div>
  </div>
);

export default React.memo(HomePage);
