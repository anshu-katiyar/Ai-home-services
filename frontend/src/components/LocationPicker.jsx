import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const defaultLocation = {
    lat: 28.6139,
    lng: 77.2090,
};

// Map click component
function LocationMarker({ marker, setMarker, onLocationSelect }) {
    useMapEvents({
        click(e) {
            const location = {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            };

            setMarker(location);
            onLocationSelect(location);
        },
    });

    return marker ? (
        <Marker
            position={marker}
            draggable={true}
            eventHandlers={{
                dragend: (e) => {
                    const position = e.target.getLatLng();

                    const location = {
                        lat: position.lat,
                        lng: position.lng,
                    };

                    setMarker(location);
                    onLocationSelect(location);
                },
            }}
        />
    ) : null;
}

export default function LocationPicker({ onLocationSelect }) {
    const [marker, setMarker] = useState(defaultLocation);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Get current location
    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const current = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                setMarker(current);
                onLocationSelect(current);
            },
            (error) => {
                console.log("Location Error:", error);
            }
        );
    }, []);

    // Search location using OpenStreetMap Nominatim
    const searchLocation = async () => {
        if (!search.trim()) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    search
                )}&limit=1`
            );

            const data = await response.json();

            if (data.length === 0) {
                alert("Location not found");
                return;
            }

            const location = {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            };

            setMarker(location);
            onLocationSelect(location);

        } catch (error) {
            console.log("Search Error:", error);
            alert("Unable to search location");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">

            {/* Search */}
            <div className="flex gap-2">

                <input
                    type="text"
                    placeholder="🔍 Search location e.g. Lucknow"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchLocation();
                        }
                    }}
                    className="flex-1 border p-3 rounded-lg"
                />

                <button
                    type="button"
                    onClick={searchLocation}
                    className="bg-blue-600 text-white px-5 rounded-lg"
                >
                    {loading ? "Searching..." : "Search"}
                </button>

            </div>

            {/* Map */}
            <MapContainer
                center={[marker.lat, marker.lng]}
                zoom={13}
                style={{
                    width: "100%",
                    height: "400px",
                }}
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                    marker={marker}
                    setMarker={setMarker}
                    onLocationSelect={onLocationSelect}
                />

            </MapContainer>

            {/* Coordinates */}
            <div className="bg-white rounded-lg p-4 text-center shadow">

                <p>
                    <strong>Latitude:</strong>{" "}
                    {marker.lat}
                </p>

                <p>
                    <strong>Longitude:</strong>{" "}
                    {marker.lng}
                </p>

            </div>

        </div>
    );
}