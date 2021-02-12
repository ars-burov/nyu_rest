export interface Place {
    name: string;
    phone: string;
    price: number;
    cuisines: string[];
    geo: {
        lat: number;
        lon: number;
    };
    address: string;
    distance?: number;
}

export interface SelectedPlace {
    name: string;
    address: string;
};

export interface UserLocation {
    lat: number;
    lon: number;
    userAllowed: boolean;
}

export interface AppState {
    selectedPlace?: SelectedPlace;
    places: Place[];
    userLocation?: UserLocation;
    searchQuery?: string;
}

const initialState: AppState = {
    places: []
}

export default initialState;