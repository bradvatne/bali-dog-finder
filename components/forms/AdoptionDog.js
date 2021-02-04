import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import uploadImage from "./../../utils/uploadImage";

export default function AdoptionDog({ onHide, session, setSelectingLocation }) {
  //Form state fields will be filled by localstorage values (for re-rendering modal after location selection)
  const modaltype = "adoptiondog";
  const [file, setFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
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
          type: "adoptiondog",
          dogname: dogname,
          description: description,
          lat: location.lat,
          long: location.lng,
          imageurl: image,
          user: session.id,
        }),
      });
      if (res.status === 201) {
        alert("Your dog has been added!");
        localStorage.clear();
        window.location.reload(true);
      } else {
        alert("Sorry, something went wrong.");
      }
    } catch (err) {
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Know a dog that needs a loving home? Fill out its information here
        </Modal.Title>
      </Modal.Header>

      <Modal.Body controlid="dogname">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlid="formGroupEmail">
            <Form.Label>Dog's Name:</Form.Label>
            <Form.Control
              required
              maxLength={20}
              type="text"
              placeholder="Enter dog's name"
              onChange={(e) => setDogname(e.target.value)}
              defaultValue={dogname}
            />
          </Form.Group>

          <Form.Group controlid="description">
            <Form.Label>Description of Dog:</Form.Label>
            <Form.Control
              required
              maxLength={500}
              as="textarea"
              rows={4}
              placeholder="Describe your lost dog and it's location"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
            />
          </Form.Group>

          <Form.Group controlid="image">
            {!image && (
              <input
                type="file"
                onChange={(e) => uploadImage(e.target.files[0], setImage, setImageLoading, imageLoading)}
                accept="image/*"
                className={imageLoading ? "hide-input" : ""}
              />
            )}
             {imageLoading && <img src="./spinner.gif"/>} 
            {image && (
              <>
                <Form.Label>Image Succesfully Uploaded</Form.Label>
                <img src={image} className="preview-img" />
              </>
            )}
          </Form.Group>

          <Form.Group controlid="location">
            <>
              <div className="d-flex flex-row mt-2">
                <Button
                  variant="dark"
                  className="w-100 "
                  onClick={handleSelectLocation}
                >
                  {location.lat != 0
                    ? "Select New Location"
                    : "Click Here to Select Location on Map"}
                </Button>
              </div>
            </>
          </Form.Group>

          <Modal.Footer>
            <Button
              type="submit"
              disabled={
                !image ||
                !location.lat ||
                !location.lng ||
                !dogname ||
                !description
              }
            >
              Submit
            </Button>

            <Button variant="danger" onClick={cancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
}

{
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
}
