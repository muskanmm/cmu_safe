"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
// import { useGoogleMaps } from 'react-hook-google-maps';
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  MapCameraChangedEvent,
  useMap,
  useMapsLibrary,
  Pin
} from '@vis.gl/react-google-maps';
// import {MarkerClusterer} from '@googlemaps/markerclusterer';

const globals = require("./front-end-globals");
const API_KEY = globals.API_KEY;
const MAP_ID = globals.MAP_ID;

function GoogleMap({ origin, destination, bluelight }) {

  const locations = [
    { key: 'bluelight', location: bluelight },
  ];


  const PoiMarkers = (props) => {
    return (
      <>
        {props.pois.map((poi) => (
          <Marker
            key={poi.key}
            position={poi.location}>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </Marker>
        ))}
      </>
    );
  };

  return (
    <APIProvider apiKey={API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        mapIDs={MAP_ID}
        defaultZoom={13}
        defaultCenter={{ lat: 40.44745632543893, lng: -79.94727836996164 }}
        onCameraChanged={(ev) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }>
        <PoiMarkers pois={locations} />
        <Directions origin={origin} destination={destination} bluelight={bluelight} />
      </Map>
    </APIProvider>
  );

}

function Directions({ origin, destination, bluelight }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const mapsLibrary = useMapsLibrary("traveling");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);


  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsRenderer.setDirections({ routes: [] });

    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: [{ location: bluelight, stopover: true },],
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }).then(response => {
      directionsRenderer.setDirections(response);
      setRoutes(response.routes)
    });
  }, [directionsService, directionsRenderer, origin, destination, bluelight]);


  // console.log(routes);
  return null;
}

export default GoogleMap;