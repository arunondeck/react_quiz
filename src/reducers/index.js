import initialState from '../stores/initialState';
import actionTypes from '../actions/actionTypes';

const ffReducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.RESET_APP:
            let armies = [];
            for(let i = 0; i< state.armyCount; i++)
                armies.push(state.armyTemplate);
            return Object.assign({}, state, {
                armies: armies, 
                initialized: true, 
                availablePlanets: state.planets.map((planet) => planet.name),
                availableVehicles: state.vehicles, 
                searchTime: 0,
                updateSearchTime: false,
                armyReady: false,
                armyResult: {},
                armySent: false 
            });

        case actionTypes.INIT_APP:
            armies = [];
            for(let i = 0; i< state.armyCount; i++)
                armies.push(state.armyTemplate);
            return Object.assign({}, state, {armies: armies, initialized: false});

        case actionTypes.RECEIVE_TOKEN:
            return Object.assign({}, state, {token: action.token});

        case actionTypes.RECEIVE_PLANETS:
            return Object.assign({}, state, {planets: action.planets, availablePlanets: action.planets.map((planet) => planet.name), initialized: state.availableVehicles.length>0});

        case actionTypes.RECEIVE_VEHICLES:
            return Object.assign({}, state, {vehicles: action.vehicles, availableVehicles: action.vehicles, initialized: state.availablePlanets.length>0});

        case actionTypes.SELECT_PLANET:
            armies = state.armies.slice();
            let selectedArmy = Object.assign({},armies[action.armyID]);
            selectedArmy.planet = action.planet;
            armies[action.armyID] = selectedArmy;
            let selectedPlanets = armies.filter((army) => army.planet !== '').map((army) => army.planet);
            let availablePlanets = state.planets.filter((planet) => !selectedPlanets.includes(planet.name)).map((planet) => planet.name);
            return Object.assign({}, state, {availablePlanets: availablePlanets, armies: armies, updateSearchTime: true});

        case actionTypes.SELECT_VEHICLE:
            armies = state.armies.slice();
            selectedArmy = Object.assign({},armies[action.armyID]);
            selectedArmy.vehicle = action.vehicle;
            armies[action.armyID] = selectedArmy;
            let selectedVehicles = armies.filter((army) => army.vehicle !== '').map((army) => army.vehicle);
            let availableVehicles = state.vehicles.map((vehicle) => {
                let used = selectedVehicles.reduce((sum, selectedVehicle) => selectedVehicle === vehicle.name ? sum + 1 : sum,0);
                return Object.assign({}, vehicle, {total_no: vehicle.total_no - used});
            })
            .filter((vehicle) => vehicle.total_no > 0);
            return Object.assign({}, state, {availableVehicles :availableVehicles, armies: armies, updateSearchTime: true});
        
        case actionTypes.UPDATE_SEARCHTIME:
            let searchTime = state.armies.reduce((sum, army) => {
                let distance = state.planets.filter((planet) => planet.name === army.planet).reduce((sum, planet) => sum + planet.distance, 0);
                let speed = state.vehicles.filter((vehicle) => vehicle.name === army.vehicle).reduce((sum, vehicle) => sum + vehicle.speed,0);
                return distance > 0 && speed > 0 ? sum + distance/speed : sum;
            },0);
            let armyReady = state.armies.reduce((ready, army) => {
                return ready && army.planet !== '' && army.vehicle !== '';
            },true);
            return Object.assign({}, state, {searchTime: searchTime, updateSearchTime: false, armyReady: armyReady});

        case actionTypes.REQUEST_SENDARMY:
            return Object.assign({}, state, {armySent: true});

        case actionTypes.RECEIVE_SENDARMY:
            let armyResult = Object.assign({}, action.data);
            armyResult.status = armyResult.status === 'false' ? false : true;
            return Object.assign({}, state, {armyResult: armyResult});
        default:
            return state;
    }
}

export default ffReducer;