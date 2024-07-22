import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisiblity = () => setConfirmPasswordShown((cur) => !cur);

  return (
    <section className="grid text-center h-screen items-center p-8 mb-6">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your details to sign up
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
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
            />
          </div>
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
            />
          </div>

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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
          <Button color="gray" size="lg" className="mt-6" fullWidth>
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
