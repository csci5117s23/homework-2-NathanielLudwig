import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";


const IndexPage = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { push } = useRouter();
  useEffect(() => {
    if (userId) {
      push("/todos");
    }
  }, [userId, push]);

  return (
    <>
      {showSignIn ? <SignIn /> : (
        <Stack gap={2} className="col-md-5 mx-auto py-3 px-3">
          <h1>Welcome to my Todo list!</h1>
          <h2>please sign in:</h2>
          <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
        </Stack>
      )}
    </>
  );
};

export default IndexPage;