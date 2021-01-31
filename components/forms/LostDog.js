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
  async function addDog(e) {
    e.preventDefault();
    console.log(dogName, description, location, imageurl, session.id);
    try {
      const res = await fetch("./api/markers", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude]);
      setLocationComplete(true);
    });
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
              onChange={(e) => setDogName(e.target.value)}
              value={dogName}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Description of Dog:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe your lost dog and it's location"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {!uploadComplete && (
              <div className="mt-3">
                <Form.Label>Upload Images:</Form.Label>
                <UploadImage files={files} onDrop={onDrop} />
                <Button variant="dark" onClick={() => upload()}>
                  Upload
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
                <Form.Label>Input Location:</Form.Label>
              </div>
              <div className="d-flex flex-row mt-2">
                <Button
                  variant="dark"
                  className="mr-2"
                  onClick={() => getCurrentLocation()}
                >
                  Use Current Location
                </Button>
                <Button variant="dark" onClick={()=> handleSelectLocation()}>Select Location on Map</Button>
              </div>
            </>
          )}
          {locationComplete && (
            <div className="mt-3">
              <p>Geographic Coordinates selected:</p>
              <p>Latitude - {location[0]}</p>
              <p>Longitude - {location[1]}</p>
            </div>
          )}

          <Modal.Footer>
            <Button onClick={addDog} type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
}
