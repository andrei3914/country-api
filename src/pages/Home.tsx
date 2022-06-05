import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import Inputs from "../components/Inputs";
import { useAppState } from "../states/app";

import "./Home.scss";

const Home = () => {
  const [dark, setDark] = useState(false);
  const [{ allCountries, loadingGetAll }, { getAllCountries }] = useAppState();

  useEffect(() => {
    getAllCountries();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleDark = () => {
    dark === false ? setDark(true) : setDark(false);
  };

  return (
    <div className={clsx("container", dark && "darkmode")}>
      <header className="container-header padding">
        <h1>Where in the world?</h1>
        <button onClick={_handleDark} className="dark-mode-button">
          <img
            src={
              dark
                ? require("../assets/moon-waning-crescent-dark.png")
                : require("../assets/moon-waning-crescent.png")
            }
            alt=""
          />
          Dark Mode
        </button>
      </header>
      <section className="container-body padding">
        <Inputs dark={dark} />
        <div className="home-body">
          {loadingGetAll ? (
            <div>Loading countries...</div>
          ) : (
            allCountries &&
            allCountries.map((country, index) => {
              return (
                <Card
                  key={`${country.name}-${index}`}
                  flag={country.flag}
                  name={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
