import { createUpdatePlacesAction } from "./reducer";
import { AppState, Place } from "./state";
import { calculateDistance } from "./utils";

const PLACES_URL = 'https://documenu.p.rapidapi.com/restaurants/search/geo';
const RAPID_API_KEY = '155f77b2e2bf79f0fc7ec4fb955bab25';
const RAPID_APP_KEY = '8362820a4cmsha0be89114f603b5p1ad869jsn41002b638f11';
const RAPID_API_HOST = 'documenu.p.rapidapi.com';

const SEARCH_DISTANCE = '5';
const SEARCH_SIZE = '10';
const SEARCH_PAGE = '1';

interface PlaceQueryParams {
    lat: string;
    lon: string;
    distance: string;
    size: string;
    page: string;
    fullMenu: string;
    "top_cuisines": string;
}

interface PlacesResponse {
    data: RawPlace[]; 
}

interface RawPlace {
    'restaurant_name': string;
    'restaurant_phone': string;
    'price_range_num': number;
    cuisines: string[];
    address: {
        city: string;
        state: string;
        'postal_code': string;
        street: string;
        formatted: string;
    };
    geo: {
        lat: number;
        lon: number;
    }
}

export const getPlaces = async (dispatch: any, getState: any) => {
    const state: AppState = getState();

    const lat = state.userLocation?.lat;
    const lon = state.userLocation?.lon;

    if (!lat || !lon) {
        return;
    }

    const queryParams: PlaceQueryParams = {
        lat: lat.toString(),
        lon: lon.toString(),
        distance: SEARCH_DISTANCE,
        size: SEARCH_SIZE,
        page: SEARCH_PAGE,
        fullMenu: 'false',
        'top_cuisines': 'false'
    }

    const url = new URL(PLACES_URL);
    Object.keys(queryParams).forEach((key) => url.searchParams.append(key, queryParams[key as keyof PlaceQueryParams]));

    try {
        const response = await fetch(url.toString(), {
            headers: {
                'x-api-key': RAPID_API_KEY,
                'x-rapidapi-key': RAPID_APP_KEY,
                'x-rapidapi-host': RAPID_API_HOST,
                useQueryString: 'true'
            }
        });
        if (response.status !== 200) {
            throw Error('Wrong code');
        }
        const rawPlaces: PlacesResponse = await response.json();
        const places = rawPlaces.data.map<Place>((place) => ({
            name: place.restaurant_name,
            phone: place.restaurant_phone,
            price: place.price_range_num,
            cuisines: place.cuisines,
            address: place.address.formatted,
            geo: {...place.geo},
            distance: state.userLocation?.userAllowed
                ? calculateDistance(place.geo.lat, place.geo.lon, lat, lon)
                : undefined
        }));
        dispatch(createUpdatePlacesAction(places));
    } catch(_) {
        console.log('Cannot get nearby places');
    }
}

export const getPlaceDetails = async (dispatch: any, getState: any) => {
    const state: AppState = getState();
    const { selectedPlace } = state;

    if (!selectedPlace) {
        return;
    }


}