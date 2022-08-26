import React from "react";

export const DeckToDevicesConnectionSvg: React.FC = React.memo(() => (
  <svg width="11px" height="68px" viewBox="0 0 11 68">
    <defs>
      <filter
        x="-60.7%"
        y="-19.2%"
        width="221.4%"
        height="138.3%"
        filterUnits="objectBoundingBox"
        id="a"
      >
        <feGaussianBlur stdDeviation={1} in="SourceGraphic" />
      </filter>
      <filter
        x="-60.7%"
        y="-19.2%"
        width="221.4%"
        height="138.3%"
        filterUnits="objectBoundingBox"
        id="b"
      >
        <feGaussianBlur stdDeviation={1} in="SourceGraphic" />
      </filter>
    </defs>
    <g
      transform="translate(-777 -203) translate(780 203)"
      stroke="none"
      fill="none"
    >
      <path stroke="#10FFB9" d="M2.5 0.5L2.5 67.5" />
      <path
        d="M0 24.38c0 2.357 1.106 4.268 2.47 4.268 1.365 0 2.471-1.91 2.471-4.268L2.471 13 0 24.38z"
        fill="#10FFB9"
        filter="url(#a)"
        transform="rotate(-180 2.47 20.824)"
      />
      <path
        d="M0 54.38c0 2.357 1.106 4.268 2.47 4.268 1.365 0 2.471-1.91 2.471-4.268L2.471 43 0 54.38z"
        fill="#10FFB9"
        filter="url(#b)"
        transform="matrix(-1 0 0 1 4.941 0)"
      />
    </g>
  </svg>
));
