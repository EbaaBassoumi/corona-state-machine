import {assign, Machine} from "xstate";

const urlCountries = "https://covid19.mathdro.id/api/countries";
const urlCasesPerCountry = "https://corona.lmao.ninja/v2/countries"


const invokeFetchCasesPerOneMillion = async country => {
    if (country !== undefined) {
        return await fetch(`${urlCasesPerCountry}/${country}`).then(response => response.json());
    }
    return Promise.reject('undefined country')
};

export const coronavirusMachine =
    Machine(
        {
            id: "coronavirus-travel",
            initial: "idle",
            context: {
                listCountries: [],
                activePerOneMillion: null,
                lastUpdated: null,
                cases: null,
                active: null,
                deaths: null,
                recovered: null
            },
            states: {
                idle: {
                    invoke: {
                        id: "fetch-countries",
                        src: "getListCountries",
                        onDone: {
                            actions: assign({
                                listCountries: (_, event) => event.data.countries
                            })
                        },
                        onError: {
                            target: "error"
                        }
                    },
                    on: {
                        SELECT: {
                            target: "loading",
                            actions: assign({
                                country: (_,event) => event.country
                            })
                        }
                    }
                },
                loading: {
                    invoke: {
                        id: "fetch-cases-per-one-million",
                        src: "fetchCasesPerOneMillion",
                        onDone: {
                            target: "done",
                            actions:  assign({
                                activePerOneMillion: (context, event) => event.data.activePerOneMillion,
                                lastUpdated: () => Date.now(),
                                cases:  (context, event) => event.data.cases,
                                active:  (context, event) => event.data.active,
                                deaths:  (context, event) => event.data.deaths,
                                recovered:  (context, event) => event.data.recovered
                            })
                        },
                        onError: {
                            target: "error"
                        }
                    }
                },
                done: {
                   on :{
                       SELECT: {
                           target: "loading",
                           actions: assign({
                               country: (_,event) => event.country
                           })
                       }
                   }
                },
                error: {
                    type: "final"
                }
            }
        },
        {
            actions: {
                printEvent: (context, event) => {
                    console.log("event ---" , event)
                    console.log("context ---" , context)
                }
            },
            services: {
                getListCountries: (context, event) =>
                    fetch(urlCountries).then(response => response.json()),

                fetchCasesPerOneMillion: async (context, event) =>
                    await invokeFetchCasesPerOneMillion(context.country)
            }
        }
    );
