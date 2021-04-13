# Getting Started with Corona State Machine

This Project is using xstate library, you can search for a country, check the last updated 
confirmed, recovered, death and active cases. Bases on assumption that if the active cases
per one million is more than 500 then there are travel restrictions. 

The idea of this project is just to show how can we implement Finite state machine concept 
in our code. 
The coronavirusMachine consists of the following states: 
- idle: start of the app, the entry action is calling an api to list all available countries.
- loading: based on user selection, this state is calling call an api to get the specific 
details of the selected country.
- done
- error


## Run The Project

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Please refer to the [official xstate documentation](https://xstate.js.org/docs/)  for more details.
