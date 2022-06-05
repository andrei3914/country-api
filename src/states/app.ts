import axios from "axios";
import { Action, createStore, createHook } from "react-sweet-state";

type Country = {
  flag: string;
  population: number;
  name: string;
  region: string;
  capital: string;
  nativeName?: string;
  subRegion?: string;
  domain?: string;
  currencies?: string[];
  languages?: string[];
  borderCountries?: string[];
};

interface AppState {
  loadingGetAll: boolean;
  allCountries?: Country[];
}

const initialState: AppState = {
  loadingGetAll: false,
  allCountries: undefined,
};

const actions = {
  getAllCountries:
    (): Action<AppState> =>
    async ({ setState }) => {
      setState({ loadingGetAll: true });
      try {
        let countries: Country[] = [];
        const response = await axios.get("https://restcountries.com/v3.1/all");
        await response.data.forEach((el: any) => {
          countries.push({
            name: el.name.common,
            flag: el.flags.png,
            population: el.population,
            region: el.region,
            capital: el.capital,
          });
        });
        setState({ allCountries: countries, loadingGetAll: false });
      } catch (err) {
        console.log("Fetch error", err);
        setState({ loadingGetAll: false });
      }
    },
};

const AppStateStore = createStore({ initialState, actions });
export const useAppState = createHook(AppStateStore);
