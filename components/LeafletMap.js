import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LeafletMap() {
  const url = "http://localhost:3000/api/markers";
  const { data } = useSwr(url, { fetcher });
  let markerData = await data.data
  return (
    <MapContainer
      center={[-8.508835484426955, 115.25187644698303]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    </MapContainer>
  );
}

/*
      {markerData.map((marker, index) => (
        <Marker
          key={index}
          position={(marker.lat), Number(marker.long)}
        >
        </Marker>
      ))}
*/
