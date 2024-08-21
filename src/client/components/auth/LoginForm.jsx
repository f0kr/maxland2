
import { useForm } from "react-hook-form";
import { useLogin } from "../../services/useLogin";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
const Button = React.lazy(()=> import('../../ui/Button'))
const Form = React.lazy(()=> import('../../ui/Form'))
const Input = React.lazy(()=> import('../../ui/Input'))
const FormRowVertical = React.lazy(()=> import('../../ui/FormRowVertical'))

function LoginForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { login, isLoading, googleLogin } = useLogin();
  function onSubmit({ email, password }) {
    if (!email || !password) return;
    login({ email, password });
    reset();
  }

  const handleGoogleLogin = (credentialResponse) => {
    console.log(credentialResponse.credential);
    googleLogin({ id_token: credentialResponse.credential });
  };

  return (

    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          login
        </Button>
      </FormRowVertical>

      <FormRowVertical>
        <GoogleOAuthProvider clientId="682522700319-7itq810kolovg3a000qjsuno0tgu1vnr.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleGoogleLogin} // Handle success
            onFailure={(error) => {
              console.error("Google login error", error);
              toast.error("Google login failed");
            }} // Handle failure
            disabled={isLoading}
          />
        </GoogleOAuthProvider>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
