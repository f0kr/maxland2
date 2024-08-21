import styled from "styled-components";
const LoginForm = React.lazy(()=> import("../components/auth/LoginForm"));
import React from "react";
import { Link } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <>
      <LoginForm />
      <Link to={"/signup"}>Create a new account</Link>

    </>
  );
}

export default Login;
