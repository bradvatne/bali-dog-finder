import { Form, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import UploadImage from "../../components/UploadImage";
import axios from "axios";

export default function LostDog({ onHide, session, setSelectingLocation }) {
  //Form Input State
  const [location, setLocation] = useState([
    localStorage.getItem("lat"),
    localStorage.getItem("long"),
  ]);
  const [dogName, setDogName] = useState(localStorage.getItem("dogname"));
  const [description, setDescription] = useState(
    localStorage.getItem("description")
  );
  const [imageurl, setImageUrl] = useState(localStorage.getItem("imageurl"));
  const [files, setFiles] = useState([]);
  const [uploadComplete, setUploadComplete] = useState(localStorage.getItem("imageurl"));
  const [locationComplete, setLocationComplete] = useState(localStorage.getItem("lat") > 2);
  const [validated, setValidated] = useState(false);

  //autoUpload dropzone
  useEffect(()=> {
    if (!uploadComplete && files.length>0) {
      upload();

    }
  })

  //Closes modal, saves state to local storage, changes selectLocation to true
  const handleSelectLocation = () => {
    onHide();
    setSelectingLocation(true);
    localStorage.setItem("modaltype", "lostdog");
    localStorage.setItem("dogname", dogName);
    localStorage.setItem("description", description);
    localStorage.setItem("imageurl", imageurl);
  };

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
  const upload = () => {
    const uploadURL = "	https://api.cloudinary.com/v1_1/ddkclruno/image/upload";
    const uploadPreset = "okzkpnl4";

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      axios({
        url: uploadURL,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: formData,
      })
        .then((res) => {
          setImageUrl(res.data.url.toString());
          setUploadComplete(true);
        })
        .catch((err) => console.log(err));
    });
  };

  //Form Submit Logic
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const res = await fetch("./api/markers", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "dogname",
          dogname: dogName,
          description: description,
          lat: location[0],
          long: location[1],
          imageurl: imageurl,
          user: session.id,
        }),
      });
      if (res.status === 201) {
        alert("Your dog has been added!");
        onHide();
      } else {
        alert("Sorry, something went wrong.");
      }
    } catch (err) {
      alert("Sorry, something went wrong.");
    }
  }

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

      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Dog's Name:</Form.Label>
            <Form.Control
              required
              maxLength={20}
              type="text"
              placeholder="Enter dog's name"
              onChange={(e) => setDogName(e.target.value)}
              value={dogName != "null" ? dogName : ""}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please add your dog's name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Description of Dog:</Form.Label>
            <Form.Control
              required
              maxLength={500}
              as="textarea"
              rows={4}
              placeholder="Describe your lost dog and it's location"
              onChange={(e) => setDescription(e.target.value)}
              value={description != "null" ? description : ""}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please add a brief description.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            
            {!uploadComplete && (
              <div className="mt-3">
                <Form.Label>Upload Images:</Form.Label>
                <UploadImage files={files} onDrop={onDrop} />
              </div>
            )}
            {uploadComplete && (
              <div className="mt-3">
                <Form.Label>
                  Your image has been successfuly uploaded
                </Form.Label>
              </div>
            )}
          </Form.Group>

          <Form.Group>
            {!locationComplete && (
              <>
                <div className="d-flex flex-row mt-2">
                  <Button
                    variant="dark"
                    className="w-100 "
                    onClick={() => handleSelectLocation()}
                  >
                    {location[0] ? "Select New Location" : "Click Here to Select Location on Map"}
                  </Button>
                </div>
                <input
                  required=""
                  maxlength="20"
                  placeholder="Enter dog's name"
                  type="hidden"
                  id="location"
                  class="form-control"
                  value={location}
                ></input>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please add a brief description.
                </Form.Control.Feedback>
              </>
            )}
          </Form.Group>

          <Modal.Footer>
            <Button
              type="submit"
              disabled={!uploadComplete & !locationComplete}
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
