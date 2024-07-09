import React from "react";
import { Rings } from "react-loader-spinner";

const Loading = ({ width, height }: any) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Rings
        height={height ? height : "200"}
        width={width ? width : "200"}
        color="#eeb127"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loading;
