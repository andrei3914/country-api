import React from "react";
import { Country, useAppState } from "../states/app";

import styles from "./SingleCountry.Module.scss";

interface Props {
  open: boolean;
  country: Country;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleCountry: React.FC<Props> = ({ open, country, setOpen }) => {
  const [, { clearSingleCountry }] = useAppState();

  const _handleGoBack = () => {
    setOpen(false);
    clearSingleCountry();
  };

  return open ? (
    <div className={styles["single-country-container"]}>
      <header>
        <button onClick={_handleGoBack} className={styles["get-back-button"]}>
          Back
        </button>
      </header>
      <div className="country-body">
        <div className="country-flag"></div>
        <div className="country-data">
          <header>{country.name}</header>
          <div>
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
              {/* <p>
                <span>Top Level Domain: </span>
                {country.domain && <span>{country.domain[0]}</span>}
              </p>
              <p>
                <span>Currencies: </span>
                {country.currencies && <span>{country.currencies[0]}</span>}
              </p>
              <p>
                <span>Languages: </span>
                {country.languages && <span>{country.languages[0]}</span>}
              </p> */}
            </div>
          </div>
          <footer>
            <p>Border Countries:</p>
            {country.borderCountries?.map((border, i) => {
              return <button key={`${i}-${border}`}>border</button>;
            })}
          </footer>
        </div>
      </div>
    </div>
  ) : null;
};

export default SingleCountry;
