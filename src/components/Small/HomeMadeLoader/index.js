import React from "react";

import "../../styles/homemadeloader.css"

const HomeMadeLoader = ({ loading }) => {
  return (
    <div className="homemadeloader">
      {loading && (
        <div className="nobookings homemadeloader-loader">
          <p>
            <span>C</span>
            <span>H</span>
            <span>A</span>
            <span>R</span>
            <span>G</span>
            <span>E</span>
            <span>M</span>
            <span>E</span>
            <span>N</span>
            <span>T</span>
            <span>.</span>
            <span> </span>
            <span>.</span>
            <span> </span>
            <span>.</span>
            <span> </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeMadeLoader;
