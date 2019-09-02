import {
    url_prefix, SHOW_LOADER, FETCH_PLANETS, FETCH_PLANETS_ERR, ADD_SEARCH_PLANET, REMOVE_SEARCH_PLANET, TOGGLE_ERR_MODAL,
    ADD_SEARCH_PLANET_ERR, FETCH_VEHICLES, FETCH_VEHICLES_ERR, ADD_VEHICLE, REMOVE_VEHICLE, API_ERROR, FOUND, NOT_FOUND, 
    RESET_STATE
} from './types';
import { csvToJSONConversion, searchNameAndSortYear } from '../utils';

export function showLoader(message) {
    return function (dispatch) {
        dispatch({
            type: SHOW_LOADER,
            payload: { "msg": message }
        })
    }
}

export function resetState() {
    return function (dispatch) {
        dispatch({
            type: RESET_STATE,
            payload: { }
        })
    }
}

export function toggleErrorModal() {
    return function (dispatch) {
        dispatch({
            type: TOGGLE_ERR_MODAL,
            payload: {}
        });
    }
}

export function addSearchPlanet(obj) {
    return function (dispatch) {
        dispatch({
            type: ADD_SEARCH_PLANET,
            payload: { "planet": obj }
        });
    }
}

export function addSearchPlanetError(errMsg) {
    return function (dispatch) {
        dispatch({
            type: ADD_SEARCH_PLANET_ERR,
            payload: { "error": errMsg }
        });
    }
}

export function removeSearchPlanet(obj) {
    return function (dispatch) {
        dispatch({
            type: REMOVE_SEARCH_PLANET,
            payload: { "planet": obj }
        });
    }
}

export function addVehicleAction(vehicle, planet) {
    return function (dispatch) {
        dispatch({
            type: ADD_VEHICLE,
            payload: { "vehicle": vehicle, "planet": planet }
        });
    }
}

export function removeVehicleAction(vehicle, planet) {
    return function (dispatch) {
        dispatch({
            type: REMOVE_VEHICLE,
            payload: { "vehicle": vehicle, "planet": planet }
        });
    }
}

export function fetchPlanetDetails() {
    return function (dispatch) {
        fetch(url_prefix + 'planets').then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(
            function (resp) {
                // console.log(resp);
                dispatch({
                    type: FETCH_PLANETS,
                    payload: { "data": resp }
                })
            }
        ).catch(function (resp) {
            console.log(resp);
            dispatch({
                type: FETCH_PLANETS_ERR,
                payload: { "error": "Error while fetching details." }
            })
        });
    }
}

export function fetchVehicleDetails() {
    return function (dispatch) {
        fetch(url_prefix + 'vehicles').then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(
            function (resp) {
                // console.log(resp);
                dispatch({
                    type: FETCH_VEHICLES,
                    payload: { "data": resp }
                })
            }
        ).catch(function (resp) {
            console.log(resp);
            dispatch({
                type: FETCH_VEHICLES_ERR,
                payload: { "error": "Error while fetching details." }
            })
        });
    }
}

export function findingFalconeAction(final_obj) {
    return function (dispatch) {
        fetch(url_prefix + 'token', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json'
            },
            body: JSON.stringify({})
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Error while finding falcone');
            }
        }).then(
            function (resp) {
                // console.log(resp);
                
                final_obj.token = resp.token;

                fetch(url_prefix + 'find', {
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(final_obj)
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Error while finding falcone');
                    }
                }).then(
                    function (resp) {
                        // console.log(resp);
                        if(resp.status === "success"){
                            dispatch({
                                type: FOUND,
                                payload: { "resp": resp }
                            })
                        }else{
                            dispatch({
                                type: NOT_FOUND,
                                payload: { "resp": resp }
                            })
                        }

                    }
                ).catch(function (resp) {
                    console.log(resp);
                    dispatch({
                        type: API_ERROR,
                        payload: { "error": "Error while finding falcone." }
                    })
                });
            }
        ).catch(function (resp) {
            console.log(resp);
            dispatch({
                type: API_ERROR,
                payload: { "error": "Error while finding falcone." }
            })
        });
    }
}



