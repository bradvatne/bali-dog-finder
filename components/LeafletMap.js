import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LeafletMap() {
  console.log("hello world");
  let data = [];
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/api/markers", {
        cancelToken: source.token,
      })
      .then((res) => {
        console.log(data, 'data first')
        data = (res.data.data);
        console.log(data, 'data second')
      })
      .catch((err) => axios.isCancel(err));

    return () => {
      source.cancel();
    };
  }, []);

  console.log(data, 'data third')


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

      {data.map((marker, index) => (
        <Marker
          key={index}
          position={[Number(marker.lat), Number(marker.long)]}
        >
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

*/
