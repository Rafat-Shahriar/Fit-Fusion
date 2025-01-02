import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signinImage from "../../assets/Forgot-password-rafiki.svg";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const Signin = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    signIn(email, password)
    toast.success('Log in Successful');
    navigate(from, { replace: true });

  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-0 bg-black">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center p-8 md:w-1/2">
          <h1 className="text-3xl text-center font-bold text-red-500 mb-6">Sign In</h1>

          <div className="relative mb-4">
            <i className="fas fa-envelope absolute left-3 top-3 text-red-500"></i>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full pl-10 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
            />
            {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
          </div>

          <div className="relative mb-6">
            <i className="fas fa-lock absolute left-3 top-3 text-red-500"></i>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full pl-10 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
            />
            {errors.password && <span className="text-red-600 text-sm">Password is required</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Submit
          </button>

          <p className="text-center text-sm text-black mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign up now
            </Link>
          </p>
        </form>

        {/* Image Section */}
        <div className="hidden md:block bg-red-500 md:w-1/2">
          <img
            src={signinImage}
            alt="Signin Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
