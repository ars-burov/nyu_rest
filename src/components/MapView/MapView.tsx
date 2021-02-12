import './MapView.css';

import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Place, UserLocation } from '../../redux/state';
import { useCallback, useMemo } from 'react';
import { createSelectPlaceAction } from '../../redux/reducer';

const GOOGLE_API_KEY = 'AIzaSyB-4BXecF641H7-GtYQWVWZ41MJSAYEvYI';

const Marker = (props: {place?: Place, lat: number, lng: number}) => {
    const place = props.place;

    const dispatch = useDispatch();
    const selectedPlaceName = useSelector<AppState, string | undefined>((state) => state.selectedPlace?.name);

    const onClick = useCallback(() => {
        console.log('On click');
        if (!place) {
            return;
        }

        if (selectedPlaceName === place.name) {
            dispatch(createSelectPlaceAction(undefined));
            return;
        }
        dispatch(createSelectPlaceAction({
            name: place.name,
            address: place.address
        }));
    }, [dispatch, place, selectedPlaceName]);
    
    return (
        <div
            className={'marker'}
            onClick={onClick}
            style={{ backgroundColor: place ? 'red' : 'blue', cursor: place ? 'pointer' : 'inherit' }}
        />
    )
}

const MapView = (props: {}) => {
    const userLocation = useSelector<AppState, UserLocation | undefined>((state) => state.userLocation);
    const places = useSelector<AppState, Place[]>((state) => state.places);

    const markers = useMemo(
        () => places.map((place) => <Marker place={place} lat={place.geo.lat} lng={place.geo.lon} />),
        [places]    
    );

    if (!places || !userLocation) {
        return null;
    }

    return (
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                defaultCenter={{ lat: userLocation.lat, lng:     userLocation.lon }}
                defaultZoom={18}
            >
                {userLocation.userAllowed ? <Marker lat={userLocation.lat} lng={userLocation.lon} /> : null}
                {markers}
            </GoogleMapReact>
        </div>
    );
}

export default MapView;