import React from "react";

export default function RiyalIcon({ width = 17, height = 18, color = "currentColor" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 15.7233L10.9035 16.75M10.9035 2.46123V12.0612C10.9035 12.1912 10.934 12.3194 10.9927 12.4362C11.0514 12.553 11.1368 12.6553 11.2423 12.7353C11.3478 12.8153 11.4706 12.8709 11.6016 12.8979C11.7325 12.9249 11.868 12.9226 11.9979 12.8912L15.75 12.0441M0.75 15.5958L5.63972 14.4296C6.02124 14.3286 6.35669 14.1059 6.59211 13.7974C6.82754 13.4889 6.94926 13.1124 6.93771 12.7286V0.75M15.75 7.59492L1.65098 10.5896"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
