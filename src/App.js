import {inspect} from '@xstate/inspect';
import React, {createContext} from "react";
import {useMachine} from "@xstate/react";
import "./styles.scss";
import {coronavirusMachine} from "./machine/coronavirusMachine";

export const MachineProvider = createContext();

inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    iframe: false // open in new window
});

function App() {
    const [current, send] = useMachine(coronavirusMachine, {devTools: true});

    return (
        <div className={'app'}>
            <main>
                <h1>Where do you want to travel ?</h1>
                <select
                    onChange={e => {
                        send("SELECT", {country: e.target.value})
                    }}>
                    <option disabled>Select one</option>
                    {current.context.listCountries.map(country => {
                        return <option key={country.name}>{country.name}</option>;
                    })}
                </select>
                <div>
                    <p className={"cases"}>Cases: {current.context.cases || 0}</p>
                    <p className={"cases"}>Active: {current.context.active || 0}</p>
                    <p className={"death"}>Deaths: {current.context.deaths || 0}</p>
                    <p className={"recovered"}>Recovered: {current.context.recovered || 0}</p>
                    <p>ActivePerOneMillion: {current.context.activePerOneMillion || 0}</p>
                    <p>LastUpdate: {current.context.lastUpdated || 0}</p>
                    <p className={"restrictions"}>{current.context.activePerOneMillion > 500 ? "Quarantine For 14 days, Negative PCR" : "No Travel Restrictions Found"}</p>
                </div>
            </main>
        </div>
    );
}

export default App;
