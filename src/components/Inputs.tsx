import React from "react";

import "./Inputs.scss";

type Props = {
  dark: boolean;
};

const Inputs: React.FC<Props> = ({ dark }) => {
  return (
    <div className="inputs-container">
      <div className="search-country-pair">
        <label htmlFor="search-country">
          <img
            src={
              dark
                ? require("../assets/magnify-dark.png")
                : require("../assets/magnify.png")
            }
            alt=""
          />
        </label>
        <input
          type="text"
          placeholder="Search for a country..."
          id="search-country"
        />
      </div>
      <select className="select-country">
        <option defaultValue={"Filter by Regions"} hidden>
          Filter by Region
        </option>
        <option value="1">Africa</option>
        <option value="2">America</option>
        <option value="3">Asia</option>
        <option value="4">Europe</option>
        <option value="5">Oceania</option>
      </select>
    </div>
  );
};

export default Inputs;
