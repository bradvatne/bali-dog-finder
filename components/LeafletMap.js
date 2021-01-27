import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function LeafletMap({data}) {
  return (
    <MapContainer
      center={[-8.508835484426955, 115.25187644698303]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

    </MapContainer>
  );
}

/*
      {data.data.map((marker, index) => (
            <Marker position={[marker.lat, marker.long]}>
                <Popup>
                    {marker.dogname}<br/>
                </Popup>
                </Marker>
          ))}
*/