import './PlacesView.css';

import { useSelector } from "react-redux";
import { AppState, Place } from "../../redux/state";
import PlaceView from './PlaceView';

const PlacesView = () => {
    const places = useSelector<AppState, Place[]>((state) => !state.searchQuery || state.searchQuery.length === 0
        ? state.places
        : state.places.filter((place) => place.name.toLowerCase().includes(state.searchQuery!.toLowerCase()))
    );

    return (
        <div className='places-container'>
            {places.map(
                (place) => <PlaceView key={place.name} place={place} />
            )}
        </div>
    )
}

export default PlacesView;