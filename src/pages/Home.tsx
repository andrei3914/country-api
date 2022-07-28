import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import Card from "../components/Card"

import Inputs from "../components/Inputs"
import SingleCountry from "../components/SingleCountry"
import { useAppState } from "../states/app"

import "./Home.scss"

const Home = () => {
  const [dark, setDark] = useState(false)
  const [countryName, setCountryName] = useState("")
  const [regionName, setRegionName] = useState("")

  const [
    { allCountries, loadingGetAll, singleCountry },
    { getAllCountries, getSingleCountry },
  ] = useAppState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getAllCountries()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _handleDark = () => {
    dark === false ? setDark(true) : setDark(false)
  }

  const filteredCountries = useMemo(() => {
    if (allCountries) {
      const countries = allCountries
      if (!countryName && !regionName) return countries
      else {
        return countryName
          ? countries.filter(
              country =>
                country.name &&
                country.name.toLowerCase().includes(countryName.toLowerCase())
            )
          : countries.filter(
              country =>
                country.region &&
                country.region.toLowerCase().includes(regionName.toLowerCase())
            )
      }
    }
  }, [countryName, regionName, allCountries])

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
            dark={dark}
            setOpen={setOpen}
          />
        ) : (
          <div>
            <Inputs
              dark={dark}
              countryName={countryName}
              setCountryName={setCountryName}
              regionName={regionName}
              setRegionName={setRegionName}
            />
            <div className="home-body">
              {loadingGetAll ? (
                <div>Loading countries...</div>
              ) : (
                filteredCountries &&
                filteredCountries.map((country, index) => {
                  return (
                    <button
                      key={`${country.name}-${index}`}
                      onClick={() => {
                        getSingleCountry(country.name)
                        setOpen(true)
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
                  )
                })
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
