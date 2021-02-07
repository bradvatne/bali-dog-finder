import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import DogCard from "../components/DogCard";

//PROPS:
//data = array of objects = marker data (dogs) from mongodb, gathered from getserversideprops in index.js
//center = array[num] = map center position, state value from index.js for selecting specific locations in nav
//selectingLocation = boolean = state value triggered by dog forms, recieved from index.js
//modalShow = object = contains information about which modal to display and whether or not to display
//markerFilter = string = set by header navbar to handle filter state for map markers
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
      //Onclick for desktop
      click(e) {
        localStorage.setItem("lat", e.latlng.lat.toString());
        localStorage.setItem("lng", e.latlng.lng.toString());
        localStorage.setItem("step", 4);
        setModalShow({
          show: true,
          modaltype: localStorage.getItem("modaltype"),
          modalStep: 4
        });

        setSelectingLocation(false);
      },
      //Touch support for mobile
      touchstart(e) {
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

  //Get marker type for filters
  function getIconColor(markerType) {
    switch (markerType) {
      case "lostdog":
        return redMarker;
      case "founddog":
        return greenMarker;
      case "adoptdog":
        return purpleMarker;
      default:
        return redMarker;
    }
  }

  //Render Map and Markers
  return (
    <MapContainer
      center={[center.lat, center.long]}
      zoom={center.zoom}
      scrollWheelZoom={true}
      className={selectingLocation ? "crosshair-cursor" : ""}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
                  <DogCard marker={marker} />
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
                  <DogCard marker={marker} />
                </Popup>
              </Marker>
            );
          else return null;
        })}
    </MapContainer>
  );
}
