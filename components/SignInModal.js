import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSession } from "next-auth/client";

export default function SignInModal({ onHide, setModalShow }) {
  const [session, loading] = useSession();

  return (
    <>
      {session && onHide()}
      {!session && <iframe src="api/auth/signin/google" />}
    </>
  );
}
