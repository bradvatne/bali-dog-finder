import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import uploadImage from "./../../utils/uploadImage";

export default function LostDog({ onHide, session, setSelectingLocation }) {
  //Form state fields will be filled by localstorage values (for re-rendering modal after location selection)
  const modaltype = "lostdog";
  const [file, setFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [number, setNumber] = useState(
    localStorage.getItem("number") != "null"
      ? localStorage.getItem("number")
      : ""
  );
  const [dogname, setDogname] = useState(
    localStorage.getItem("dogname") != "null"
      ? localStorage.getItem("dogname")
      : ""
  );
  const [description, setDescription] = useState(
    localStorage.getItem("description") != "null"
      ? localStorage.getItem("description")
      : ""
  );
  const [gender, setGender] = useState(
    localStorage.getItem("gender") != "null"
      ? localStorage.getItem("gender")
      : null
  );
  const [size, setSize] = useState(
    localStorage.getItem("size") != "null" ? localStorage.getItem("size") : null
  );
  const [image, setImage] = useState(
    localStorage.getItem("imageurl") != "null"
      ? localStorage.getItem("imageurl")
      : ""
  );
  const [location, setLocation] = useState({
    lat:
      localStorage.getItem("lat") != "null"
        ? Number(localStorage.getItem("lat"))
        : "",
    lng:
      localStorage.getItem("lng") != "null"
        ? Number(localStorage.getItem("lng"))
        : "",
  });

  //Closes modal, saves state to local storage, changes selectLocation to true
  const handleSelectLocation = () => {
    localStorage.setItem("modaltype", modaltype);
    localStorage.setItem("dogname", dogname);
    localStorage.setItem("description", description);
    localStorage.setItem("imageurl", image);
    localStorage.setItem("gender", gender);
    localStorage.setItem("size", size);
    localStorage.setItem("number", number);
    setSelectingLocation(true);
    onHide();
  };

  //Form Submit Logic
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("./api/markers", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "lostdog",
          dogname: dogname,
          description: description,
          size: size,
          gender: gender,
          lat: location.lat,
          long: location.lng,
          imageurl: image,
          number: number,
          user: session.id,
        }),
      });
      if (res.status === 201) {
        alert("Your dog has been added!");
        localStorage.clear();
        window.location.reload(true);
      } else {
        console.log(res);
        alert("Sorry, something went wrong.");
      }
    } catch (err) {
      console.log(err);
      alert("Sorry, something went wrong.");
    }
  }

  //Cancel button clears local storage and closes moodal
  function cancel() {
    localStorage.clear();
    onHide();
  }

  //Render
  return (
    <>
      <Modal.Body controlid="dogname">
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlid="formGroupDogName"
            className="h-100 m-0"
          >
            <div className="flex-form">
              <Form.Label className="custom-label">
                What is your doggo's name?
              </Form.Label>
              <div className="angled-container">
                <Form.Control
                  required
                  maxLength={20}
                  type="text"
                  autofocus="autofocus"
                  onChange={(e) => setDogname(e.target.value)}
                  defaultValue={dogname}
                />
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div className="custom-label step-label">
                    1/4
                </div>
                <div>
                <img src="/next.png" className="next-button" />
              </div>
            </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

/**
  USE CURRENT LOCATION
            function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude]);
      setLocationComplete(true);
    });
  }
                <Button
                  variant="dark"
                  className="mr-2"
                  onClick={() => getCurrentLocation()}
                >
                  Use Current Location
                </Button>

            {locationComplete && (
            <div className="mt-3">
              <p>Geographic Coordinates selected:</p>
              <p>Latitude - {location[0]}</p>
              <p>Longitude - {location[1]}</p>
            </div>
          )}


*/

/** 
 *             <Button
              variant="success"
              onClick={() =>
                console.log(
                  image,
                  location.lat,
                  location.lng,
                  dogname,
                  description,
                  imageLoading
                )
              }
            >
              Test State
            </Button>
 */
