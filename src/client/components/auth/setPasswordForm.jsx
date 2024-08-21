
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setPassword as setPasswordApi } from "../../services/apiAuth";
import React from "react";
const Button = React.lazy(()=> import('../../ui/Button'))
const Form = React.lazy(()=> import('../../ui/Form'))
const FormRow = React.lazy(()=> import('../../ui/FormRow'))
const Input = React.lazy(()=> import('../../ui/Input'))


function SetPasswordForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const location = useLocation();
  const googleId = location.state.googleId;

  const onSubmit = async ({ password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await setPasswordApi({ password, googleId });
      toast.success("Password set successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (

    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Password" error={errors.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Confirm Password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="submit">Set Password</Button>
      </FormRow>
    </Form>

  );
}

export default SetPasswordForm;
