import axios from "axios"
import { Action, createStore, createHook } from "react-sweet-state"

type Currency = {
  code: string
  name: string
  symbol: string
}

type Language = {
  iso639_1: string
  iso639_2: string
  name: string
  nativeName: string
}

export type Country = {
  flag: string
  population: number
  name: string
  region: string
  capital: string
  nativeName?: string
  subRegion?: string
  domain?: string
  currencies?: Currency[]
  languages?: Language[]
  borderCountries?: string[]
}

interface AppState {
  loadingGetAll: boolean
  allCountries?: Country[]
  singleCountry?: Country
}

const initialState: AppState = {
  loadingGetAll: false,
  allCountries: undefined,
  singleCountry: undefined,
}

const actions = {
  getAllCountries:
    (): Action<AppState> =>
    async ({ setState }) => {
      setState({ loadingGetAll: true })
      try {
        let countries: Country[] = []
        const response = await axios.get("https://restcountries.com/v3.1/all")
        await response.data.forEach((el: any) => {
          countries.push({
            name: el.name.common,
            flag: el.flags.png,
            population: el.population,
            region: el.region,
            capital: el.capital,
          })
        })

        setState({ allCountries: countries, loadingGetAll: false })
      } catch (err) {
        console.log("Fetch error", err)
        setState({ loadingGetAll: false })
      }
    },

  getSingleCountry:
    (value: string, isCode?: boolean): Action<AppState> =>
    async ({ setState }) => {
      try {
        let country: Country = {
          flag: "",
          population: 0,
          name: "",
          region: "",
          capital: "",
        }

        const response = !isCode
          ? await axios.get(`https://restcountries.com/v2/name/${value}`)
          : await axios.get(`https://restcountries.com/v2/alpha/${value}`)

        if (response.data) {
          if (isCode) response.data = [response.data]

          country.name = response.data[0].name
          country.capital = response.data[0].capital
          country.flag = response.data[0].flags.png
          country.region = response.data[0].region
          country.population = response.data[0].population
          country.nativeName = response.data[0].nativeName
          country.subRegion = response.data[0].subregion
          country.borderCountries = response.data[0].borders
          country.domain = response.data[0].topLevelDomain
          country.currencies = response.data[0].currencies
          country.languages = response.data[0].languages

          setState({ singleCountry: country })
        }
      } catch (err) {
        console.log("Fetch error", err)
        setState({ loadingGetAll: false })
      }
    },

  clearSingleCountry:
    (): Action<AppState> =>
    ({ setState }) => {
      setState({ singleCountry: undefined })
    },
}

const AppStateStore = createStore({ initialState, actions })
export const useAppState = createHook(AppStateStore)
