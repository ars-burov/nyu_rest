import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppState, Place } from '../../redux/state';
import './PlaceDetails.css';
import { formatCusines } from './utils';

interface Props {
    show?: boolean;
}

const PlaceDetails = ({show}: Props) => {
    const place = useSelector<AppState, Place | undefined>(
        (state) => state.places.find((place) => place.name === state.selectedPlace?.name)
    );

    const isSmallScreen = window.innerWidth < 680;

    const formattedDistance = useMemo(
        () => place?.distance !== undefined
            ? `${Math.round(place.distance).toString()} meters from you`
            : 'Turn on geolocation to see how far the place is from you',
        [place?.distance]
    );

    if (!place || isSmallScreen) {
        return null;
    }

    return (
        <div className='place-details-container'>
            <div>{place.name}</div>
            <div style={{ paddingTop: 5 }}>{formatCusines(place.cuisines)} {'$'.repeat(place.price + 1)}</div>
            <div style={{ paddingTop: 50 }}>{place.phone}</div>
            <div>{place.address}</div>
            <div style={{ paddingTop: 10 }}>{formattedDistance}</div>
            <div className="close-hint">Click the same restaurant to close the window</div>
        </div>
    );
}

export default PlaceDetails;