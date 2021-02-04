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
  markerFilter,
}) {
  //Gets lat long values from user click, store in localStorage to hoist back into the form
  function SelectLocation() {
    const map = useMapEvents({
      click(e) {
        localStorage.setItem("lat", e.latlng.lat.toString());
        localStorage.setItem("lng", e.latlng.lng.toString());
        setModalShow({
          show: true,
          modaltype: localStorage.getItem("modaltype"),
        });

        setSelectingLocation(false);
      },
    });
    return null;
  }

   //Create Red Marker (Lost Dog)
   const defaultMarker = L.icon({
    iconUrl: "./marker-purple.png",
    iconSize: [25, 40],
  });

  //Create Red Marker (Lost Dog)
  const redMarker = L.icon({
    iconUrl: "./marker-red.png",
    iconSize: [25, 40],
  });

  //Create Purple Marker (Adoption Dog)
  const purpleMarker = L.icon({
    iconUrl: "./marker-purple.png",
    iconSize: [25, 40],
  });

  //Create Green Marker (Found Dog)
  const greenMarker = L.icon({
    iconUrl: "./marker-green.png",
    iconSize: [25, 40],
  });

  //Marker Array
  const markerColor = [redMarker, purpleMarker, greenMarker];

  //TESTING MARKERS - Random Marker Colors
  function getRandomColor() {
    return markerColor[Math.floor(Math.random() * 3)];
  }

  function getIconColor(markerType) {
    switch (markerType) {
      case "lostdog":
        return redMarker;
      case "founddog":
        return greenMarker;
      case "adoptiondog":
        return purpleMarker;
      default:
        return defaultMarker;
    }
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
      {selectingLocation && <SelectLocation />}
      {!selectingLocation &&
        data.map((marker, index) => {
          if (markerFilter == "showAll")
            return (
              <Marker
                icon={getIconColor(marker.type)}
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
            );
          else if (markerFilter == marker.type)
            return (
              <Marker
                icon={getIconColor(marker.type)}
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
            );
          else return null;
        })}
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
