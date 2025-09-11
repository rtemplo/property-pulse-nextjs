'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from '@/components/Spinner';
import Map, { Marker } from 'react-map-gl/mapbox';

import { OutputFormat } from 'react-geocode';
import type { PropertyDocument } from '@/models/Property';
import 'mapbox-gl/dist/mapbox-gl.css';
import pin from '@/assets/images/pin.svg';

interface PropertyMapProps {
  property: PropertyDocument;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px'
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState<boolean>(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'US',
    outputFormat: OutputFormat.JSON
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (property.location) {
        const address = `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`;
        try {
          const response = await fromAddress(address);

          if (response?.results?.length > 0) {
            const { lat, lng } = response.results[0].geometry.location;
            setLat(lat);
            setLng(lng);
            setViewport({
              ...viewport,
              latitude: lat,
              longitude: lng
            });
            setGeocodeError(false);
          } else {
            setGeocodeError(true);
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
          setGeocodeError(true);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCoordinates();
  }, [property.location, viewport]);

  if (loading) {
    return <Spinner />;
  }

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    lat &&
    lng && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{ latitude: lat, longitude: lng, zoom: 15 }}
        style={{ width: '100%', height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="Property Pin" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
