import { useState } from "react";

import { useForm } from "react-hook-form";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisiblity = () =>
    setConfirmPasswordShown((cur) => !cur);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    const myForm = new FormData();
    myForm.set("firstName", data.firstName);
    myForm.set("lastName", data.lastName);
    myForm.set("email", data.email);
    myForm.set("password", data.password);
    myForm.set("avatar", data.avatar[0]);
    // dispatch(registerUser(myForm));
  };

  return (
    <section className="grid text-center h-screen items-center p-8 mb-6">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your details to sign up
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="firstName">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                First Name
              </Typography>
            </label>
            <Input
              id="firstName"
              color="gray"
              size="lg"
              type="text"
              name="firstName"
              placeholder="First Name "
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("firstName", {
                required: "First Name is required",
                minLength: "5",
                maxLength: "20",
              })}
            />
          </div>
          {errors.firstName && (
            <p className="my-2 text-red-600">{errors.firstName.message}</p>
          )}
          <div className="mb-6">
            <label htmlFor="lastName">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Last Name
              </Typography>
            </label>
            <Input
              id="lastName"
              color="gray"
              size="lg"
              type="text"
              name="lastName"
              placeholder="Lat Name "
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("lastName", {
                required: "Last Name is required",
                minLength: "5",
                maxLength: "20",
              })}
            />
          </div>
          {errors.lastName && (
            <p className="my-2 text-red-600">{errors.lastName.message}</p>
          )}
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              {...register("email", {
                required: "Email is required",
                pattern: "_%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/,",
              })}
            />
          </div>
          {errors.email && (
            <p className="my-2 text-red-600">{errors.email.message}</p>
          )}
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              {...register("password", {
                required: "Password is required",
                minLength: "8",
                maxLength: "30",
              })}
            />
          </div>
          {errors.password && (
            <p className="my-2 text-red-600">{errors.password.message}</p>
          )}
          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={confirmPasswordShown ? "text" : "password"}
              icon={
                <i onClick={toggleConfirmPasswordVisiblity}>
                  {confirmPasswordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                minLength: "8",
                maxLength: "30",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="my-2 text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Avatar
              </Typography>
            </label>

            <input
              type="file"
              accept="image/*"
              className="block w-full border peer border-secondarybg  shadow-sm rounded-lg text-sm focus:border-2 focus:border-secondarybg focus:border-t-transparent focus:!border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 disabled:opacity-50 disabled:pointer-events-none  file:border-0 file:me-4 file:py-3 file:px-4  dark:file:bg-neutral-700 dark:file:text-neutral-400"
              {...register("avatar", {
                required: "Avatar image is required",
              })}
            />
            {errors.avatar && (
              <p className="my-2 text-red-600">{errors.avatar.message}</p>
            )}
          </div>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            sign up
          </Button>

          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign up with google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Already have an account?{" "}
            <Link to="/sign-in" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
