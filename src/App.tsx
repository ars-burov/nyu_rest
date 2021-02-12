import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import PlacesView from './components/PlacesView/PlacesView';
import MapView from './components/MapView/MapView';
import { useDispatch } from 'react-redux';
import { getPlaces } from './redux/thunks';
import { createUpdateGeolocationAction } from './redux/reducer';
import PlaceDetails from './components/PlacesView/PlaceDetails';

const App = () => {
  const dispatch = useDispatch();

  const dispatchGeolocation = useCallback((lat=40.68919, lon=-73.992378, userAllowed=false) => {
    dispatch(createUpdateGeolocationAction({
      lat,
      lon,
      userAllowed,
    }));
    dispatch(getPlaces);
  }, [dispatch]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => dispatchGeolocation(position.coords.latitude, position.coords.longitude, true),
        (_) => dispatchGeolocation()
      );
    } else {
      dispatchGeolocation();
    }
  }, [dispatchGeolocation]);

  const [showMap, _toggleMap] = useState(false);
  const isSmallScreen = window.innerWidth < 680;

  return (
    <div className="App">
      <div className="screen-container">
        <div className='menu-button' onClick={(_) => _toggleMap(!showMap)} style={{ display: isSmallScreen ? 'block' : 'none' }}/>
        <div className="left-section" style={{ display: isSmallScreen && showMap ? 'none' : 'block' }}>
          <PlaceDetails />
          <div className='scroll-container'>
            <SearchBar />
            <PlacesView />
          </div>
        </div>
        <div className="map-section" style={{ display: isSmallScreen && !showMap ? 'none' : 'block' }}>
          <MapView />
        </div>
      </div>
    </div>
  );
}

export default App;
