// src/components/MapComponent.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

const locations = [
  {
    id: 1,
    name: "Gogi 1",
    lat: 10.834674530216235,
    lng: 106.66214388804457,
  },
  {
    id: 2,
    name: "Gogi 2",
    lat: 10.838012896765624,
    lng: 106.67126317878606,
  },
  {
    id: 3,
    name: "Gogi 3",
    lat: 10.841889960490747,
    lng: 106.63714429045586,
  },
];

const MapComponent = () => {
  return (
    <MapContainer
      center={[10.8443298, 106.6328165]} // Tọa độ trung tâm bản đồ
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      {/* Layer bản đồ từ OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Hiển thị marker cho các vị trí */}
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customMarker}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
