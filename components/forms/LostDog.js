import { Form, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import UploadImage from "../../components/UploadImage";
import axios from "axios";
import imageCompression from 'browser-image-compression'

export default function LostDog({ onHide, session, setSelectingLocation }) {

  //Form state fields will be filled by localstorage values (for re-rendering modal after location selection)
  const modaltype = "lostdog";
  const [files, setFiles] = useState([]);
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

  //Hacky solution to auto upload image from dropzone
  useEffect(() => {
    if (!image & (files.length > 0)) {
      upload();
    }
  });

  //Image Upload DropZone
  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  //Image Upload Logic
  async function upload() {
    const uploadURL = "	https://api.cloudinary.com/v1_1/ddkclruno/image/upload";
    const uploadPreset = "okzkpnl4";

    files.forEach((file) => {
      const formData = new FormData();
      imageCompression(file, {maxSizeMB: .5, maxWidthOrHeight: 250}).then((res) => {
            imageCompression.getDataUrlFromFile(res).then((compressedImageUrl)=> {
            formData.append("file", compressedImageUrl)
            formData.append("upload_preset", uploadPreset);
            console.log(compressedImageUrl)
          })

      })
      axios({
        url: uploadURL,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData,
      })
        .then((res) => {
          setImage(res.data.url.toString());
        })
        .catch((err) => setImage(""));
    });
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
          lat: location.latlng[0],
          long: location.latlng[1],
          imageurl: image,
          user: session.id,
        }),
      });
      if (res.status === 201) {
        alert("Your dog has been added!");
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

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Your Lost Dog's Information
        </Modal.Title>
      </Modal.Header>

      <Modal.Body controlId="dogname">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupEmail">
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

          <Form.Group controlId="description">
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

          <Form.Group controlId="image">
            {!image && (
              <div className="mt-3">
                <Form.Label>Upload Images:</Form.Label>
                <UploadImage files={files} onDrop={onDrop} />
              </div>
            )}
            {image && (
              <div className="mt-3">
                <Form.Label>
                  Your image has been successfuly uploaded
                </Form.Label>
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="location">
            <>
              <div className="d-flex flex-row mt-2">
                <Button
                  variant="dark"
                  className="w-100 "
                  onClick={handleSelectLocation}
                >
                  {location
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
                !image || !location.lat || !location.lng || !dogname || !description
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
}
