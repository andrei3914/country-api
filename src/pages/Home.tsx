import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import Inputs from "../components/Inputs";
import SingleCountry from "../components/SingleCountry";
import { useAppState } from "../states/app";

import "./Home.scss";

const Home = () => {
  const [dark, setDark] = useState(false);
  const [
    { allCountries, loadingGetAll, singleCountry },
    { getAllCountries, getSingleCountry },
  ] = useAppState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllCountries();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [open]);

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
        {singleCountry ? (
          <SingleCountry
            open={open}
            country={singleCountry}
            setOpen={setOpen}
          />
        ) : (
          <div>
            <Inputs dark={dark} />
            <div className="home-body">
              {loadingGetAll ? (
                <div>Loading countries...</div>
              ) : (
                allCountries &&
                allCountries.map((country, index) => {
                  return (
                    <button
                      key={`${country.name}-${index}`}
                      onClick={() => {
                        getSingleCountry(country.name);
                        setOpen(true);
                      }}
                      style={{
                        borderRadius: "7px",
                      }}
                    >
                      <Card
                        flag={country.flag}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
