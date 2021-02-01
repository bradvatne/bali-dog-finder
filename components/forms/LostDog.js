import { Form, Modal, Button } from "react-bootstrap";
import { useState} from "react";
import UploadImage from "../../components/UploadImage";
import axios from "axios";

export default function LostDog({ onHide, session, setSelectingLocation }) {
  //Form Input State
  const [location, setLocation] = useState([localStorage.getItem('lat'),localStorage.getItem('long')]);
  const [dogName, setDogName] = useState(localStorage.getItem('dogname'));
  const [description, setDescription] = useState(localStorage.getItem('description'));
  const [imageurl, setImageUrl] = useState(localStorage.getItem('imageurl'));
  const [files, setFiles] = useState([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [locationComplete, setLocationComplete] = useState(false);
  const [validated, setValidated] = useState(false);

  //Closes modal, saves state to local storage, changes selectLocation to true
  const handleSelectLocation = () => {
    onHide();
    setSelectingLocation(true);
    localStorage.setItem('modaltype', 'lostdog')
    localStorage.setItem('dogname', dogName);
    localStorage.setItem('description', description);
    localStorage.setItem('imageurl', imageurl);
  }


  
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

  //Form Submit API Logic
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(dogName, description, location, imageurl, session.id);
    try {
      const res = await fetch("./api/markers", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: 'dogname',
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
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Dog's Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter dog's name"
              onChange={(e) => setDogName(e)}
              value={dogName != 'null' ? dogName : ''}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Dog's name must contain only letters and be less than 20 characters</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Description of Dog:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe your lost dog and it's location"
              onChange={(e) => setDescription(e.target.value)}
              value={description != 'null' ? description : ''}
            />
            {!uploadComplete && (
              <div className="mt-3">
                <Form.Label>Upload Images:</Form.Label>
                <UploadImage files={files} onDrop={onDrop} />
                <Button variant="dark" className="btn-width" onClick={() => upload()}>
                  Upload Images
                </Button>
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
          {!locationComplete && (
            <>
              <div className="mt-3">
                <Form.Label>{location[0] ? "Location succesfully registered, you may choose again if you wish:" : "Input Location:"}</Form.Label>
              </div>
              <div className="d-flex flex-row mt-2">
                <Button variant="dark" className="btn-width" onClick={()=> handleSelectLocation()}>{location[0] ? 'Select New Location' : 'Select Location'}</Button>
              </div>
            </>
          )}


          <Modal.Footer>
            <Button onClick={handleSubmit} type="submit">
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

{/**
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


*/}