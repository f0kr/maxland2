import { useForm } from "react-hook-form";
import React from "react";
import { useSignup } from "../../services/useSignup";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const Button = React.lazy(()=> import('../../ui/Button'))
const Form = React.lazy(()=> import('../../ui/Form'))
const FormRow = React.lazy(()=> import('../../ui/FormRow'))
const Input = React.lazy(()=> import('../../ui/Input'))


function SignupForm({ nonce }) {
  const { signup, isLoading, googleSignup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ name, email, password }) {
    signup({ name, email, password });
    reset();
  }
  const handleGoogleSignup = (credentialResponse) => {
    console.log(credentialResponse.credential);
    googleSignup({ id_token: credentialResponse.credential });
  };
  return (

    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
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
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
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
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Sign up</Button>
      </FormRow>
      <FormRow>
        <GoogleOAuthProvider clientId="682522700319-7itq810kolovg3a000qjsuno0tgu1vnr.apps.googleusercontent.com">
          <GoogleLogin
            nonce={nonce}
            onSuccess={handleGoogleSignup}
            onFailure={(error) => console.error("Google signup error", error)}
            disabled={isLoading}
          />
        </GoogleOAuthProvider>
      </FormRow>
    </Form>

  );
}

export default SignupForm;
