import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Card, Button } from "react-bootstrap";

//data = array of objects = marker data (dogs) from mongodb, gathered from getserversideprops in index.js
//center = array[num] = map center position, state value from index.js for selecting specific locations in nav
//selectingLocation = boolean = state value triggered by dog forms, recieved from index.js
export default function LeafletMap({
  data,
  center,
  selectingLocation,
  setSelectingLocation,
  setModalShow,
}) {
  //Gets lat long values from user click, store in localStorage to hoist back into the form
  function SelectLocation() {
    const map = useMapEvents({
      click(e) {
        localStorage.setItem("lat", e.latlng.lat.toString());
        localStorage.setItem("lng", e.latlng.lng.toString());
        console.log(localStorage);
        setModalShow({
          show: true,
          modaltype: localStorage.getItem("modaltype"),
        });

        setSelectingLocation(false);
      },
    });
    return null;
  }

  //Markers
  const redMarker = L.icon({ iconUrl: "./marker-red.png", iconSize: [25, 40] });
  const purpleMarker = L.icon({
    iconUrl: "./marker-purple.png",
    iconSize: [25, 40],
  });
  const greenMarker = L.icon({
    iconUrl: "./marker-green.png",
    iconSize: [25, 40],
  });
  const markerColor = [redMarker, purpleMarker, greenMarker];

  function getRandomColor() {
    return markerColor[Math.floor(Math.random() * 3)];
  }

  return (
    <MapContainer
      center={[center.lat, center.long]}
      zoom={center.zoom}
      scrollWheelZoom={true}
      className={selectingLocation ? "crosshair-cursor" : ""}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={getRandomColor()}
        position={[-8.508275852717324, 115.26692973077012]}
      />
      {selectingLocation && <SelectLocation />}
      {!selectingLocation &&
        data.map((marker, index) => (
          <Marker
            icon={getRandomColor()}
            key={index}
            position={[marker.lat, marker.long]}
          >
            <Popup>
              <Card style={{ width: "18rem", border: "none" }}>
                {marker.imageurl && <Card.Img src={marker.imageurl} />}
                <Card.Body>
                  <Card.Title>{marker.dogname}</Card.Title>
                  <Card.Text>{marker.description}</Card.Text>
                  <Button variant="primary" className="w-100">
                    Contact Owner
                  </Button>
                </Card.Body>
              </Card>
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
