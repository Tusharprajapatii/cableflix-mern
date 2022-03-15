import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, register } from "../services/user/authSlice";
import { reset } from "../services/user/authSlice";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
function SignIn() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, error } = useSelector((state) => state.auth);
  // const [Signup, responseInfo] = usePostSignUpMutation();
  const [signup, setSignup] = React.useState(true);
  const [signUser, setSignUser] = React.useState({
    name: "",
    password: "",
    email: "",
  });
  const [loginUser, setLoginUser] = React.useState({
    password: "",
    email: "",
  });
  const onChangeHandler = (e) => {
    setSignUser({
      ...signUser,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeLoginHandler = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };
  React.useEffect(() => {
    if (user) {
      navigate("/home");
      alert.success("logged successfully");
    }
    if (error) alert.error("error in logging in");
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);
  const onSubmitSignHandler = (e) => {
    e.preventDefault();
    dispatch(register(signUser));
  };
  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginUser));
  };
  return (
    <div className="h-screen bg-[url('https://help.nflxext.com/396a2a39-8d34-4260-b07a-6391fe04ded5_what_is_netflix_2_en.png')] flex justify-center items-center">
      {signup ? (
        <div className=" w-full md:w-2/5 rounded-xl px-4 py-4  flex flex-col items-center backdrop-saturate-50 bg-white/30">
          <div className="font-bold text-slate-100">SIGN UP</div>
          <div className="w-full">
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => onSubmitSignHandler(e)}
            >
              <div className="flex flex-col my-2  w-4/5 sm:w-3/5">
                <label className="text-slate-100" htmlFor="name">
                  firstName
                </label>

                <input
                  className="border-2 rounded-md p-1"
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={signUser.name.split(" ")[0]}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="flex flex-col my-2  w-4/5 sm:w-3/5">
                <label className="text-slate-100" htmlFor="email">
                  email
                </label>
                <input
                  className="border-2 rounded-md p-1"
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={signUser.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="flex flex-col my-2 w-4/5 sm:w-3/5">
                <label className="text-slate-100" htmlFor="password">
                  password
                </label>

                <input
                  className="border-2 rounded-md p-1"
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={signUser.password}
                  onChange={onChangeHandler}
                />
              </div>
              <button className="text-slate-100 ring-4 bg-black p-1 rounded-md">
                Sign Up
              </button>
            </form>
            <div className="flex justify-between text-slate-100">
              <span>Already a User?</span>{" "}
              <span>
                <button
                  onClick={() => setSignup(false)}
                  className="ring-4 px-1 rounded-md bg-black"
                >
                  login
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full md:w-2/5 rounded-xl px-4 py-4  flex flex-col items-center backdrop-saturate-50 bg-white/30">
          <div className="font-bold text-slate-100">LOG IN</div>
          <div className="w-full">
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => onSubmitLoginHandler(e)}
            >
              <div className="flex flex-col my-2  w-4/5 sm:w-3/5">
                <label className="text-slate-100" htmlFor="email">
                  email
                </label>
                <input
                  className="border-2 rounded-md p-1"
                  type="text"
                  id="email"
                  name="email"
                  required
                  value={loginUser.email}
                  onChange={onChangeLoginHandler}
                />
              </div>
              <div className="flex flex-col my-2 w-4/5 sm:w-3/5">
                <label className="text-slate-100" htmlFor="password">
                  password
                </label>

                <input
                  className="border-2 rounded-md p-1"
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={loginUser.password}
                  onChange={onChangeLoginHandler}
                />
              </div>
              <button className="text-slate-100 ring-4 bg-black p-1 rounded-md">
                LogIn
              </button>
            </form>
            <div className="flex justify-between text-slate-100">
              <span>New User?</span>{" "}
              <span>
                <button
                  onClick={() => setSignup(true)}
                  className="ring-4 px-1 rounded-md bg-black"
                >
                  sign Up
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SignIn;
