import React , {useEffect} from "react";
import { Navbar, Button, IconButton, Collapse } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { Avatar } from "@material-tailwind/react";
import {
  signoutUserSucess,
  signoutUserFailure,
} from "../Reducers/userSlice.js";
import axios from "axios";
import { extractErrorMessage } from "../extractMsg.js";
import { toast } from "react-toastify";




export function NavbarDefault() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = React.useState(false);
  const { currentUser, success } = useSelector((state) => state.user);
// console.log(success)
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await axios.post("/api/v1/users/signout");
      dispatch(signoutUserSucess());
      navigate("/sign-in");
      toast.success(res.data.message);
    } catch (error) {
      // console.log("err", error);
      let htmlError = extractErrorMessage(error.response?.data)
      dispatch(signoutUserFailure(htmlError || error.message));
      toast.error(htmlError);
    }
  };
  useEffect(()=>{
if(!success){
  navigate("/sign-in");
}
  }, [dispatch, success])
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          LOGO
        </Link>
        {success ? (
          <>
            {currentUser ? (
              <div className="flex flex-row gap-4 justify-center items-center">
                <Avatar
                  src={
                    currentUser && currentUser
                      ? currentUser?.data?.user?.avatar
                      : "https://docs.material-tailwind.com/img/face-2.jpg"
                  }
                  alt="avatar"
                />
                <p className="text-gray-600 text-xl font-thin">
                  {currentUser.data?.user?.firstName.toUpperCase()}
                </p>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {success ? (
          <>
            <Button
              onClick={handleSignOut}
              variant="text"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Sign Out</span>
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-x-1">
            <Link to="/sign-in">
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign In</span>
              </Button>
            </Link>

            <Link to="/sign-up">
              {" "}
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>
        )}

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {success ? (
          <>
            <Button
              onClick={handleSignOut}
              fullWidth
              variant="text"
              size="sm"
              className=""
            >
              <span>Sign Out</span>
            </Button>
          </>
        ) : (
          <div className="container mx-auto">
            <div className="flex items-center gap-x-1">
              <Link to="/sign-in">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/sign-up">
                {" "}
                <Button fullWidth variant="gradient" size="sm" className="">
                  <span>Sign Up</span>
                </Button>{" "}
              </Link>
            </div>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
}
