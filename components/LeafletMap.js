import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

export default function LeafletMap({ data }) {
  const [markerData, setMarkerData] = useState([
    {
      lat: -8.508835484426955,
      long: 115.25187644698303,
      dogname: "buddy",
    },
  ]);
  console.log("first", data);
  useEffect(() => {
    setMarkerData(data);
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
      {markerData.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.long]}>
          <Popup>
            {marker.dogname}
            <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

/*
            {markerData && markerData.map((marker, index) => (
            <Marker position={[marker.lat, marker.long]}>
                <Popup>
                    {marker.dogname}<br/>
                </Popup>
                </Marker>
          ))}
*/
