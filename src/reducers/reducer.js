import {
    SHOW_LOADER, FETCH_PLANETS, FETCH_PLANETS_ERR, ADD_SEARCH_PLANET, REMOVE_SEARCH_PLANET, TOGGLE_ERR_MODAL,
    ADD_SEARCH_PLANET_ERR, FETCH_VEHICLES, FETCH_VEHICLES_ERR, ADD_VEHICLE, REMOVE_VEHICLE, API_ERROR, FOUND,
    NOT_FOUND, RESET_STATE
} from '../actions/types';

const initialState = {
    isLoader: false,
    loadMessage: "",
    planets: [],
    selected_planets: [],
    err_modal: false,
    err_modal_msg: "",
    vehicles: [],
    total_time_taken: 0,
    comp_planets_cnt: 0,
    final_result: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                isLoader: true,
                loadMessage: action.payload.msg,
            }
        case API_ERROR:
            return {
                ...state,
                err_modal_msg: action.payload.error,
                err_modal: !state.err_modal,
                isLoader: false,
                loadMessage: "",
            }
        case TOGGLE_ERR_MODAL:
            return {
                ...state,
                err_modal: !state.err_modal
            }
        case FETCH_PLANETS:
            return {
                ...state,
                planets: action.payload.data,
                err_modal_msg: "",
            }
        case FETCH_PLANETS_ERR:
            return {
                ...state,
                planets: [],
                err_modal_msg: action.payload.error,
                err_modal: !state.err_modal,
            }
        case FETCH_VEHICLES:
            return {
                ...state,
                vehicles: action.payload.data,
                err_modal_msg: "",
            }
        case FETCH_VEHICLES_ERR:
            return {
                ...state,
                vehicles: [],
                err_modal_msg: action.payload.error,
                err_modal: !state.err_modal,
            }
        case ADD_SEARCH_PLANET:
            return {
                ...state,
                selected_planets: [...state.selected_planets, action.payload.planet],
                err_modal_msg: "",
            }
        case ADD_SEARCH_PLANET_ERR:
            return {
                ...state,
                err_modal_msg: action.payload.error,
                err_modal: !state.err_modal,
            }
        case REMOVE_SEARCH_PLANET:
            let newSelected_planets_rm = state.selected_planets.filter((item) => item.name.toLowerCase() !== action.payload.planet.name.toLowerCase());
            return {
                ...state,
                selected_planets: newSelected_planets_rm,
            }
        case ADD_VEHICLE:

            let newSelPLat_Add = state.selected_planets.map((addVh, addVhIx) => {
                if (addVh.name === action.payload.planet.name) {
                    return {
                        ...addVh,
                        selected_vehicle: action.payload.vehicle,
                        time_taken: addVh.distance / action.payload.vehicle.speed
                    }
                } else {
                    return {
                        ...addVh
                    }
                }
            });

            let newVh_Add = state.vehicles.map((vh_add) => {
                if (vh_add.name === action.payload.vehicle.name) {
                    return {
                        ...vh_add,
                        total_no: vh_add.total_no - 1,
                    }
                } else {
                    return {
                        ...vh_add
                    }
                }
            });

            return {
                ...state,
                selected_planets: newSelPLat_Add,
                vehicles: newVh_Add,
                total_time_taken: state.total_time_taken + action.payload.planet.distance / action.payload.vehicle.speed,
                comp_planets_cnt: state.comp_planets_cnt + 1,
            }
        case REMOVE_VEHICLE:

            let newSelPLat_Rm = state.selected_planets.map((RmVh, RmVhIx) => {
                if (RmVh.name === action.payload.planet.name) {
                    return {
                        ...RmVh,
                        selected_vehicle: {},
                        time_taken: 0
                    }
                } else {
                    return {
                        ...RmVh
                    }
                }
            });

            let newVh_Rm = state.vehicles.map((vh_Rm) => {
                if (vh_Rm.name === action.payload.vehicle.name) {
                    return {
                        ...vh_Rm,
                        total_no: vh_Rm.total_no + 1,
                    }
                } else {
                    return {
                        ...vh_Rm
                    }
                }
            });

            return {
                ...state,
                selected_planets: newSelPLat_Rm,
                vehicles: newVh_Rm,
                total_time_taken: state.total_time_taken - action.payload.planet.distance / action.payload.vehicle.speed,
                comp_planets_cnt: state.comp_planets_cnt - 1,
            }
        case FOUND:
            return {
                ...state,
                final_result: action.payload.resp,
                isLoader: false,
                loadMessage: "",
            }
        case NOT_FOUND:
            return {
                ...state,
                final_result: action.payload.resp,
                isLoader: false,
                loadMessage: "",
            }
        case RESET_STATE:
            return {
                isLoader: false,
                loadMessage: "",
                planets: [],
                selected_planets: [],
                err_modal: false,
                err_modal_msg: "",
                vehicles: [],
                total_time_taken: 0,
                comp_planets_cnt: 0,
                final_result: {}
            }
        default:
            return state;
    }
}

