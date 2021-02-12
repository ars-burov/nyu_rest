import initialState, { AppState, Place, SelectedPlace, UserLocation } from "./state";

interface UpdateGeoLocationAction {
    type: 'UPDATE_GEOLOCATION',
    payload: UserLocation
}

interface UpdatePlacesAction {
    type: 'UPDATE_ACTION';
    payload: Place[];
}

interface SelectPlaceAction {
    type: 'SELECT_ACTION',
    payload?: SelectedPlace;
}

interface UpdateSearchQueryAction {
    type: 'UPDATE_SEARCH',
    payload?: string;
}

export type ReduxAction = UpdatePlacesAction | SelectPlaceAction | UpdateGeoLocationAction | UpdateSearchQueryAction;

export const createUpdatePlacesAction = (payload: Place[]): UpdatePlacesAction => ({
    type: 'UPDATE_ACTION',
    payload
});

export const createSelectPlaceAction = (payload?: SelectedPlace): SelectPlaceAction => ({
    type: 'SELECT_ACTION',
    payload
});

export const createUpdateGeolocationAction = (payload: UserLocation): UpdateGeoLocationAction => ({
    type: 'UPDATE_GEOLOCATION',
    payload
});

export const createUpdateSearchQueryAction = (payload?: string): UpdateSearchQueryAction => ({
    type: 'UPDATE_SEARCH',
    payload
});

export default function appReducer(
    state: AppState = initialState,
    action: ReduxAction
): AppState {
    switch (action.type) {
        case 'UPDATE_ACTION':
            return {
                ...state,
                places: action.payload
            }
        case 'SELECT_ACTION':
            return {
                ...state,
                selectedPlace: action.payload
            };
        case 'UPDATE_GEOLOCATION':
            return {
                ...state,
                userLocation: action.payload
            }
        case 'UPDATE_SEARCH':
            return {
                ...state,
                searchQuery: action.payload
            }
        default:
            return state;
    }
}
