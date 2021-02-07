import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { useState, useRef } from "react";
import uploadImage from "./../../utils/uploadImage";

export default function LostDog({ onHide, session, setSelectingLocation }) {
  //Form state fields will be filled by localstorage values (for re-rendering modal after location selection)
  const modaltype = "lostdog";
  const [imageLoading, setImageLoading] = useState(false);
  const imageRef = useRef();

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
  const [step, setStep] = useState(
    localStorage.getItem("ste[") != "null"
      ? Number(localStorage.getItem("step"))
      : 1
  );

  //Handling switching between steps
  const nextStep = (storageName, stateName, nextNum) => {
    if (storageName != undefined) {
      localStorage.setItem(storageName, stateName);
      localStorage.setItem('step', nextNum)
    }
    setStep(nextNum);
  };

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
        <Form onSubmit={handleSubmit} className="w-100">
          {step == 1 && (
            <Form.Group controlid="formGroupDogName" className="h-100 m-0">
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
                  <div className="custom-label step-label">1/5</div>
                  <div>
                    <img
                      src="/next.png"
                      className="next-button"
                      onClick={() => nextStep("dogname", dogname, 2)}
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
          )}
          {step == 2 && (
            <Form.Group
              controlid="formGroupDogGender"
              className="h-100 w-100 m-0"
            >
              <div className="flex-form">
                <Form.Label className="custom-label">
                  Is it a boy or a girl?
                </Form.Label>
                <div className="gender-container">
                  <a
                    className={
                      gender == "male"
                        ? "gender gender-male gender-male-active"
                        : "gender gender-male"
                    }
                    onClick={(e) => setGender("male")}
                  >
                    Male
                  </a>
                  <a
                    className={
                      gender == "female"
                        ? "gender gender-female gender-female-active"
                        : "gender gender-female"
                    }
                    onClick={(e) => setGender("female")}
                  >
                    Female
                  </a>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <div className="custom-label step-label">2/5</div>
                  <div>
                    <img
                      src="/next.png"
                      className="next-button"
                      onClick={() => nextStep("gender", gender, 3)}
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
          )}
          {step == 3 && (
            <Form.Group controlid="formGroupImage" className="h-100 m-0">
              <div className="flex-form">
                <Form.Label className="custom-label">
                  Let's see a cute photo of {gender == "male" && "him"}
                  {gender == "female" && "her"}
                </Form.Label>
                <InputGroup
                  controlid="image"
                  className="img-upload-container"
                  onClick={() => imageRef.current.click()}
                >
                  {!image && (
                    <>
                      <label
                        className={imageLoading ? "hide-input" : "hover-click"}
                      >
                        <img
                          src="/upload-choose.png"
                          className="img-upload-btn"
                        />
                      </label>
                      <input
                        type="file"
                        ref={imageRef}
                        onChange={(e) =>
                          uploadImage(
                            e.target.files[0],
                            setImage,
                            setImageLoading,
                            imageLoading
                          )
                        }
                        accept="image/*"
                        className={imageLoading ? " " : "hide-input"}
                      />
                    </>
                  )}
                  {imageLoading && <img src="./spinner.gif" />}
                  {image && (
                    <>

                        <img src="/upload-complete.png" className="img-upload-btn"/>

                    </>
                  )}
                </InputGroup>
                <div className="d-flex flex-row justify-content-between">
                  <div className="custom-label step-label">3/5</div>
                  <div>
                    <img
                      src="/next.png"
                      className="next-button"
                      onClick={() => nextStep(undefined, undefined, 4)}
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
          )}
          {step == 4 && (
            <Form.Group controlid="formGroupLocation" className="h-100 m-0">
              <div className="flex-form">
                <Form.Label className="custom-label">
                  Where was {gender == "male" ? "he" : "she"} last seen?
                </Form.Label>
                <a onClick={handleSelectLocation}>
                  {location.lat != 0 ? (
                    <img
                      src="/location-complete.png"
                      className="location-img"
                    />
                  ) : (
                    <img src="/location-choose.png" className="location-img" />
                  )}
                </a>
                <div className="d-flex flex-row justify-content-between">
                  <div className="custom-label step-label">4/5</div>
                  <div>
                    <img
                      src="/next.png"
                      className="next-button"
                      onClick={() => nextStep(undefined, undefined, 5)}
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
          )}
          {step == 5 && (
            <Form.Group controlid="formGroupDescription" className="h-100 m-0">
              <div className="flex-form">
                <Form.Label className="custom-label">
                  Any last details?
                </Form.Label>
                <div className="angled-container">
                  <Form.Control
                    required
                    maxLength={500}
                    as="textarea"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
                  />
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <div className="custom-label step-label">5/5</div>
                  <div>
                    <img
                      src="/next.png"
                      className="next-button"
                      onClick={() => nextStep(undefined, undefined, 1)}
                    />
                  </div>
                </div>
              </div>
            </Form.Group>
          )}
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
