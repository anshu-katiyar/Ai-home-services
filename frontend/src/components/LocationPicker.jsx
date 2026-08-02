import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

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
            >

                <Marker position={marker} />

            </GoogleMap>

        </LoadScript>

    );
}