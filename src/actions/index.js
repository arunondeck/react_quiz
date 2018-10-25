import store from '../stores';
import actionTypes from '../actions/actionTypes';
import constants from '../constants';

export const init_app = () => {
    return {
        type: actionTypes.INIT_APP
    }
}

export const request_data = () => {
    return {
        type: actionTypes.REQUEST_DATA
    }
}

export const receive_data = data => {
    return {
        type: actionTypes.RECEIVE_DATA,
        data: data
    }
}

export const request_vehicles = () => {
    return {
        type: actionTypes.REQUEST_VEHICLES
    }
}

export const receive_vehicles = data => {
    return {
        type: actionTypes.RECEIVE_VEHICLES,
        vehicles: data
    }
}

export const request_planets = () => {
    return {
        type: actionTypes.REQUEST_PLANETS
    }
}

export const receive_planets = data => {
    return {
        type: actionTypes.RECEIVE_PLANETS,
        planets: data
    }
}

export const request_findFalcone = () => {
    return {
        type: actionTypes.REQUEST_FINDFALCONE
    }
}

export const receive_findFalcone = data => {
    return {
        type: actionTypes.RECEIVE_FINDFALCONE,
        data: data
    }
}

export const request_token = () => {
    return{
        type: actionTypes.REQUEST_TOKEN
    }
}

export const receive_token = token => {
    return{
        type: actionTypes.RECEIVE_TOKEN,
        token: token
    }
}

export const REQUEST_SENDARMY = () => {
    return{
        type: actionTypes.REQUEST_SENDARMY
    }
}

export const RECEIVE_SENDARMY = data => {
    return{
        type: actionTypes.RECEIVE_SENDARMY,
        data: data
    }
}

export function initApp(){
    return dispatch => {
        store.dispatch(init_app());
        dispatch(requestPlanets()).then(data =>{
            dispatch(requestVehicles()).then(data => {
                return dispatch(requestToken());
            });
        });
    }
}

export function requestToken(){
    store.dispatch(request_token());
    return async (dispatch, getState) => {
        const data = await fetch(constants.TOKEN_URL, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Accept": "application/json"
            }
        });
        const data_1 = await data.json();
        dispatch(receive_token(data_1.token));
    }
}

export function requestPlanets(){
    store.dispatch(request_planets());
    return async dispatch => {
        const data = await fetch(constants.PLANETS_URL);
        const data_1 = await data.json();
        dispatch(receive_planets(data_1));
    }
}

export function requestVehicles(){
    store.dispatch(request_vehicles());
    return async dispatch => {
        const data = await fetch(constants.VEHICLES_URL);
        const data_1 = await data.json();
        dispatch(receive_vehicles(data_1));
    }
}

export function requestFindFalcone(){
    store.dispatch(REQUEST_SENDARMY());
    return (dispatch, getState) => {
        return fetch(constants.FF_URL, {
            method: 'POST',
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                token: getState().token,
                planet_names: getState().armies.map((army)=> army.planet),
                vehicle_names: getState().armies.map((army) => army.vehicle)
            })
        })
        .then(data => data.json())
        .then(data => {
            dispatch(RECEIVE_SENDARMY(data));
        });
    }
}