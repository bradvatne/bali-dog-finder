import { useEffect } from "react";
import { signIn, useSession } from "next-auth/client";

//Sign in pop-up window
const SignInPage = () => {
  const [session, loading] = useSession();

  useEffect(() => {
    //Currently only for google
    if (!loading && !session)
      void signIn("facebook", { redirectUrl: "/auth/signinfacebook" });
    //Close window when complete
    if (!loading && session) window.close();
  }, [session, loading]);

  return null;
};

export default SignInPage;
