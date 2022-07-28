import React from "react"
import { Country, useAppState } from "../states/app"

import "./SingleCountry.Module.scss"

interface Props {
  open: boolean
  country: Country
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  dark: boolean
}

const SingleCountry: React.FC<Props> = ({ open, country, setOpen, dark }) => {
  const [, { clearSingleCountry, getSingleCountry }] = useAppState()

  const _handleGoBack = () => {
    setOpen(false)
    clearSingleCountry()
  }

  return open ? (
    <div className="single-country-container">
      <header>
        <button onClick={_handleGoBack} className="get-back-button">
          <span>
            <img
              src={
                dark
                  ? require("../assets/arrow-light.png")
                  : require("../assets/arrow-dark.png")
              }
              alt=""
            />
          </span>
          <span>Back</span>
        </button>
      </header>
      <div className="country-body">
        <div className="country-flag">
          <img src={country.flag} alt="" />
        </div>
        <div className="country-data">
          <header>{country.name}</header>
          <div className="country-data-body">
            <div>
              <p>
                <span>Native Name: </span>
                <span>{country.nativeName}</span>
              </p>
              <p>
                <span>Population: </span>
                <span>{country.population}</span>
              </p>
              <p>
                <span>Region: </span>
                <span>{country.region}</span>
              </p>
              <p>
                <span>Sub Region: </span>
                <span>{country.subRegion}</span>
              </p>
              <p>
                <span>Capital: </span>
                <span>{country.capital}</span>
              </p>
            </div>
            <div>
              <p>
                <span>Top Level Domain: </span>
                {country.domain && <span>{country.domain}</span>}
              </p>

              <p>
                <span>Currencies: </span>
                {country.currencies &&
                  country.currencies.map((currency, i) => (
                    <span key={`${currency}-${i}`}>{currency.name} </span>
                  ))}
              </p>

              <p>
                <span>Languages: </span>
                {country.languages &&
                  country.languages.map((language, i) => (
                    <span key={`${language}-${i}`}>{language.name} </span>
                  ))}
              </p>
            </div>
          </div>
          {country.borderCountries && (
            <footer>
              <p>Border Countries:</p>
              {country.borderCountries?.map((border, i) => {
                return (
                  <button
                    key={`${i}-${border}`}
                    className="country-border-button"
                    onClick={() => getSingleCountry(border, true)}
                  >
                    {border}
                  </button>
                )
              })}
            </footer>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default SingleCountry
