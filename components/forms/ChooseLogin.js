import { Modal, Button } from "react-bootstrap";
import { useSession } from "next-auth/client";

export default function ChooseLogin({
  setPopUp,
  setFacebookPopUp,
  modalShow,
  setModalShow,
}) {
  const [session, loading] = useSession();
  return (
    <>
      {!session && (
        <>
          <Modal.Header className="justify-content-center">
            <Modal.Title>
              Sign in to get started
              <br />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
            <Button
              className="social-login bg-facebook"
              onClick={() => {
                localStorage.setItem("provider", "facebook");
                setFacebookPopUp(true);
              }}
            >
              Sign in with Facebook
            </Button>
            <Button
              className="social-login bg-google"
              onClick={() => {
                localStorage.setItem("provider", "google");
                setPopUp(true);
              }}
            >
              Sign in with Google
            </Button>
          </Modal.Body>

          <Modal.Footer className="justify-content-center">
            <small>
              By using social login, we only verify your account with the
              provider. We will never get access to your password. Read more at{" "}
              <a href="https://oauth.net/2/" target="_blank">
                oAuth2.
              </a>
            </small>
          </Modal.Footer>
        </>
      )}
      {session &&
        setModalShow({
          show: modalShow.nextmodal ? true : false,
          modaltype: modalShow.nextmodal,
        })}
    </>
  );
}
