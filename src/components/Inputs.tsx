import React from "react"

import "./Inputs.scss"

type Props = {
  dark: boolean
  countryName: string
  regionName: string
  setCountryName: React.Dispatch<React.SetStateAction<string>>
  setRegionName: React.Dispatch<React.SetStateAction<string>>
}

const Inputs: React.FC<Props> = ({
  dark,
  countryName,
  setCountryName,
  regionName,
  setRegionName,
}) => {
  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value)
  }

  const _handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("here i am")
    setRegionName(e.target.value)
  }

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
          value={countryName}
          onChange={_handleChange}
        />
      </div>
      <select className="select-country" onChange={_handleOptionSelect}>
        <option defaultValue={"Filter by Regions"} hidden>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  )
}

export default Inputs
