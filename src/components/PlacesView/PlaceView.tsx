import './PlaceView.css';

import { AppState, Place } from "../../redux/state";
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelectPlaceAction } from '../../redux/reducer';
import { formatCusines } from './utils';

interface Props {
    place: Place;
}

const PlaceView = (props: Props) => {
    const { place } = props;

    const dispatch = useDispatch();
    const selectedPlaceName = useSelector<AppState, string | undefined>((state) => state.selectedPlace?.name);

    const onClick = useCallback(() => {
        if (selectedPlaceName === place.name) {
            dispatch(createSelectPlaceAction(undefined));
            return;
        }
        dispatch(createSelectPlaceAction({
            name: place.name,
            address: place.address
        }));
    }, [dispatch, place.address, place.name, selectedPlaceName]);

    return (
        <div className={'place-container'} onClick={onClick}>
            <div>{place.name}</div>
            <div style={{ paddingTop: 5 }}>{formatCusines(place.cuisines)} {'$'.repeat(place.price + 1)}</div>
            <div>{place.address}</div>
        </div>
    );
}

export default PlaceView;
