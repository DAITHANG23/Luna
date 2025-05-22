/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/utils";

// Fix lỗi icon không hiện
const customMarker = new L.Icon({
  iconUrl: "/assets/images/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41], // Kích thước icon
  iconAnchor: [12, 41], // Vị trí neo của icon
  popupAnchor: [1, -34], // Vị trí neo của popup
  shadowSize: [41, 41], // Kích thước bóng của icon
});

interface MapComponentProps {
  className?: string;
  locationsList?: any;
  lat?: number;
  lng?: number;
}

const MapComponent = ({
  className,
  locationsList,
  lat = 10.8443298,
  lng = 106.6328165,
}: MapComponentProps) => {
  return (
    <MapContainer
      center={[lat, lng]} // Tọa độ trung tâm bản đồ
      zoom={13}
      className={cn(className, "h-[37.5rem] w-full")}
    >
      {/* Layer bản đồ từ OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Hiển thị marker cho các vị trí */}
      {locationsList &&
        locationsList.map((loc: any) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={customMarker}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
