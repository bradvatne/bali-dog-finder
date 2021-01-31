import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Card, Button } from "react-bootstrap";

//data = array of objects = marker data (dogs) from mongodb, gathered from getserversideprops in index.js
//center = array[num] = map center position, state value from index.js for selecting specific locations in nav
//selectingLocation = boolean = state value triggered by dog forms, recieved from index.js
export default function LeafletMap({ data, center, selectingLocation, setSelectingLocation, setModalShow}) {
  //gets lat long values from user click
  function SelectLocation() {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng)
        setSelectingLocation(false);
        localStorage.setItem('lat', e.latlng.lat);
        localStorage.setItem('long', e.latlng.lng);
        setModalShow({ show: true, modalContent: localStorage.getItem('modaltype')})
        console.log(localStorage)
      },
    })
    return null;
  }

  return (
    <MapContainer
      center={[center.lat, center.long]}
      zoom={center.zoom}
      scrollWheelZoom={true}
      className={selectingLocation ? 'crosshair-cursor' : ''}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectingLocation && <SelectLocation/>}
      {!selectingLocation && data.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.long]}>
          <Popup>
            <Card style={{ width: "18rem", border: "none" }}>
              {marker.imageurl && <Card.Img variant='top' src={marker.imageurl}/>}
              <Card.Body>
                <Card.Title>{marker.dogname}</Card.Title>
                <Card.Text>
                  {marker.description}
                </Card.Text>
                <Button variant="primary" className="w-100">Contact Owner</Button>
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
