import { useEffect } from "react";
import { signIn, useSession } from "next-auth/client";

const SignInPage = () => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session)
      void signIn("google", {
        callbackUrl: "https://balidogfinder.com/auth/signin/",
      });
    if (!loading && session) window.close();
  }, [session, loading]);

  return null;
};

export default SignInPage;
