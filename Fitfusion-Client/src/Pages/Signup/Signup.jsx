import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signupImage from "../../assets/Sign-up-rafiki.svg";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const onSubmit = (data) => {
        const { name, email, photoUrl, password } = data;

        // Ensure email is sent to the database in lowercase
        const emailLowerCase = email.toLowerCase();

        createUser(email, password)
            .then((result) => {
                console.log(result.user, "user");

                // Update user profile
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        const userData = {
                            name,
                            email: emailLowerCase,
                            photoUrl,
                            role: "user",
                            height: "",
                            weight: "",
                            age: "",
                        };

                        axios
                            .post(`${import.meta.env.VITE_API_URL}/user`, userData)

                        toast.success("User registered successfully!");
                        navigate(from, { replace: true });


                    })
                    .catch((error) => {
                        console.error("Error updating user profile:", error);
                        toast.error("Failed to update user profile.");
                    });
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                toast.error("Failed to create user.");
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-black">
            <div className="relative w-full max-w-4xl bg-white shadow-lg flex flex-col md:flex-row rounded-lg">
                <div className="bg-red-500 md:w-1/2">
                    <img
                        src={signupImage}
                        alt="Sign Up"
                        className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    />
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-4 flex-1 flex flex-col justify-center"
                >
                    <h1 className="text-3xl text-center font-bold text-red-500">Sign Up</h1>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            className="w-full pl-4 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <span className="text-red-600 text-sm">{errors.name.message}</span>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full pl-4 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
                        />
                        {errors.email && (
                            <span className="text-red-600 text-sm">Email is required</span>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="photoUrl"
                            id="photoUrl"
                            placeholder="Photo Url"
                            className="w-full pl-4 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
                            {...register("photoUrl")}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full pl-4 pr-4 py-2 border-b-2 text-black border-gray-300 focus:border-red-500 outline-none"
                        />
                        {errors.password && (
                            <span className="text-red-600 text-sm">Password is required</span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Submit
                    </button>
                    <p className="text-center text-sm text-gray-700">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="text-red-500 cursor-pointer hover:underline"
                        >
                            Sign in now
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
