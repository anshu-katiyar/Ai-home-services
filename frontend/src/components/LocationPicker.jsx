import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
    width: "100%",
    height: "400px"
};

const center = {
    lat: 28.6139,
    lng: 77.2090
};

export default function LocationPicker({ onLocationSelect }) {

    const [marker, setMarker] = useState(center);

    useEffect(() => {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const current = {

                    lat: position.coords.latitude,

                    lng: position.coords.longitude

                };

                setMarker(current);

                if (onLocationSelect) {

                    onLocationSelect(current);

                }

            },

            (error) => {

                console.log(error);

            }

        );

    }

}, []);

    const handleClick = (e) => {

        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };

        setMarker(location);

        if (onLocationSelect) {
            onLocationSelect(location);
        }
    };

    return (

        <LoadScript
            googleMapsApiKey={
                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }
        >

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={marker}
                zoom={14}
                onClick={handleClick}

                options={{
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false
}}
            >

                <Marker
    position={marker}
    draggable={true}
    onDragEnd={(e) => {

        const location = {

            lat: e.latLng.lat(),

            lng: e.latLng.lng()

        };

        setMarker(location);

        onLocationSelect(location);

    }}
/>

            </GoogleMap>

        </LoadScript>

    );
}