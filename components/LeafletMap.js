import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

export default function LeafletMap() {
  const [markerData, setMarkerData] = useState();
  useEffect(() => {
    
  }, []);

  console.log("markerdata", markerData);
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
        <Marker key={index} position={[marker.lat, marker.long]}>
          <Popup>
            {marker.dogname}
            <br />
          </Popup>
        </Marker>
      ))}
*/
