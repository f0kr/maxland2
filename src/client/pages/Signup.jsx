import styled from "styled-components";
const SignupForm = React.lazy(()=> import("../components/auth/SignupForm"));
import React from "react";
import { Link } from "react-router-dom";
const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function SignUp({ nonce }) {
  if (typeof window === "undefined") {
    return null;
  }
  return ( 
          <SignUpLayout>
      <SignupForm nonce={nonce} />
      <Link to={"/login"}>Already have an account ?</Link>
         </SignUpLayout>
 

  );
}

export default SignUp;
