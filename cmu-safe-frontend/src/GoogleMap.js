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
    {key: "bluelight1", location: { lat: 40.44532487117178, lng: -79.94896289872858 }},
    {key: "bluelight2", location: { lat: 40.44424285573, lng: -79.94151987367867 }},
    {key: "bluelight3", location: { lat: 40.44325415025914, lng: -79.94452990178975 }},
    {key: "bluelight4", location: { lat: 40.44269057820116, lng: -79.9458826185967 }},
    {key: "bluelight5", location: { lat: 40.44421335640257, lng: -79.94442364075167 }},
    {key: "bluelight6", location: { lat: 40.44120735699097, lng: -79.943327007896 }},
    {key: "bluelight7", location: { lat: 40.44094651217302, lng: -79.94380093312968 }},
    {key: "bluelight8", location: { lat: 40.44358842139843, lng: -79.94557200251208 }},
    {key: "bluelight9", location: { lat: 40.44380998198888, lng: -79.94613632514435 }},
    {key: "bluelight10", location: { lat: 40.44289259942445, lng: -79.94670149578045 }},
    {key: "bluelight11", location: { lat: 40.444690384334464, lng: -79.94478117239179 }},
    {key: "bluelight12", location: { lat: 40.44542112922806, lng: -79.9443120728167 }},
    {key: "bluelight13", location: { lat: 40.4462115520614, lng: -79.94431612895792 }},
    {key: "bluelight14", location: { lat: 40.44607209907213, lng: -79.9436558076857 }},
    {key: "bluelight15", location: { lat: 40.44501070370934, lng: -79.94378456656818 }},
    {key: "bluelight16", location: { lat: 40.445545274072, lng: -79.94265885840805 }},
    {key: "bluelight17", location: { lat: 40.44623823846592, lng: -79.94254724820854 }},
    {key: "bluelight18", location: { lat: 40.44298490828685, lng: -79.93920384518604 }},
    {key: "bluelight19", location: { lat: 40.442544847366854, lng: -79.93769745746029 }},
    {key: "bluelight20", location: { lat: 40.44177161803253, lng: -79.93881004566654 }},
  ];


  const PoiMarkers = (props) => {
    return (
      <>
        {props.pois.map((poi) => (
          <Marker
            key={poi.key}
            position={poi.location}
          >
            <Pin background={'#0f53ff'} glyphColor={"white"} borderColor={'#000'} />
          </Marker>
        ))}
      </>
    );
  };

  return (
    <APIProvider apiKey={API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <Map
        style={{ width: '70vw', height: '70vh' }}
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
      travelMode: window.google.maps.TravelMode.WALKING,
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