import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiAward, FiCalendar, FiEdit2, FiPlus, FiTarget, FiTrendingUp, FiUser } from 'react-icons/fi';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { GiTireIronCross } from "react-icons/gi";
import { LuListChecks } from "react-icons/lu";

const Profile = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [currentGoal, setCurrentGoal] = useState("");
    const [showCustomGoalForm, setShowCustomGoalForm] = useState(false);
    const [customGoal, setCustomGoal] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        goals: [],
        dailyExercise: "",
    });

    const routines = {
        "Build Muscle": {
            routine: ["Weightlifting: 5x/week", "High-protein diet", "Cardio: 1x/week"],
        },
        "Lose Weight": {
            routine: ["Cardio: 5x/week", "Caloric deficit diet", "HIIT: 2x/week"],
        },
        "Improve Stamina": {
            routine: ["Running: 4x/week", "Cycling: 2x/week", "Swimming: 1x/week"],
        },
        "Flexibility": {
            routine: ["Yoga: Daily", "Stretching: 5x/week", "Pilates: 3x/week"],
        },
    };

    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/users/${user?.email}`);
        setUserData(data);
        setFormData(data);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProfileSubmit = async () => {
        try {
            const dataToSend = { ...formData };
            delete dataToSend._id;
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, dataToSend);
            await getData();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleGoalSelect = (goal) => {
        setCurrentGoal(goal);
    };

    const handleSaveGoal = async () => {
        try {
            const goalToAdd = showCustomGoalForm ? customGoal : currentGoal;
            if (!goalToAdd) return;

            const updatedGoals = [
                ...(userData.goals || []),
                {
                    goal: goalToAdd,
                    routine: routines[goalToAdd]?.routine || [],
                    startDate: new Date().toISOString(),
                    status: "In Progress",
                },
            ];

            const updatedData = {
                ...userData,
                goals: updatedGoals,
            };

            delete updatedData._id;
            await axios.put(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, updatedData);
            await getData();

            setCurrentGoal("");
            setCustomGoal("");
            setShowCustomGoalForm(false);
            setIsGoalModalOpen(false);
        } catch (error) {
            console.error("Error updating goal:", error);
        }
    };

    const handleComplete = async (goalIndex) => {
        const updatedUserData = { ...userData };
        updatedUserData.goals[goalIndex].status = "Complete";
        delete updatedUserData._id;
        await axios.put(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, updatedUserData);
        await getData();
    };

    if (!userData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-4 md:p-6">
            <div className="max-w-4xl mx-auto mb-5">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-t-2xl p-4 md:p-8 relative">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            <img
                                src={formData.photoUrl}
                                alt="Profile"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="text-white text-center md:text-left">
                            <h1 className="text-xl md:text-2xl font-bold">{userData.name}</h1>
                            <p className="text-red-100 text-sm md:text-base">{userData.email}</p>

                            <div className="mt-4 flex flex-col sm:flex-row gap-2 md:gap-3">
                                <Link
                                    to="/nutrationDashboard"
                                    className="text-red-500 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-red-500 hover:text-white transition duration-300"
                                >
                                    Nutration Dashboard
                                </Link>
                                <Link
                                    to="/wrokoutDashboard"
                                    className="text-red-500 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-red-500 hover:text-white transition duration-300"
                                >
                                    Workout Dashboard
                                </Link>
                                <Link
                                    to="/goalsAndRoutines"
                                    className="text-red-500 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base hover:bg-red-500 hover:text-white transition duration-300"
                                >
                                    Goals & Routines
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Details Section */}
            <div className="max-w-4xl mx-auto mb-5">
                <div className="bg-zinc-900 border-red-600 border-2 rounded-xl shadow-lg p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="bg-red-600 p-2 md:p-3 rounded-full animate-pulse">
                                <FiUser className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Personal Details</h1>
                                <p className="text-red-400 text-sm md:text-base">Transform & Conquer</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105"
                        >
                            <FiEdit2 className="w-4 h-4 mr-2" />
                            Edit
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                        {[
                            { label: "Name", value: userData.name, icon: <FiUser className="w-5 h-5" /> },
                            { label: "Age", value: `${userData.age} years`, icon: <FiCalendar className="w-5 h-5" /> },
                            { label: "Height", value: `${userData.height} cm`, icon: <FiTrendingUp className="w-5 h-5" /> },
                            { label: "Weight", value: `${userData.weight} kg`, icon: <FiTarget className="w-5 h-5" /> },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800 rounded-xl p-3 md:p-4 transform hover:scale-105 transition-all duration-300 border border-red-600/20 hover:border-red-600"
                            >
                                <div className="flex items-center space-x-2 mb-1 md:mb-2">
                                    <div className="text-red-500">{stat.icon}</div>
                                    <p className="text-xs md:text-sm font-medium text-gray-400">{stat.label}</p>
                                </div>
                                <p className="text-base md:text-lg font-bold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fitness Dashboard Section */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-zinc-900 border-red-600 border-2 rounded-xl shadow-lg p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="bg-red-600 p-2 md:p-3 rounded-full animate-pulse">
                                <FiActivity className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Fitness Dashboard</h1>
                                <p className="text-red-400 text-sm md:text-base">Transform & Conquer</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsGoalModalOpen(true)}
                            className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30"
                        >
                            <FiPlus className="w-4 h-4 mr-2" />
                            Add Goal
                        </button>
                    </div>

                    {/* Goals Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {userData?.goals?.map((goalData, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800 rounded-xl p-4 transform hover:scale-105 transition-all duration-300 border border-red-600/20 hover:border-red-600"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-red-500">
                                            <FiAward className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base md:text-lg font-semibold text-white">{goalData.goal}</h3>
                                    </div>
                                    <span className="px-2 py-1 text-xs font-medium bg-red-600/20 text-red-400 rounded-full">
                                        {goalData.status}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {goalData.routine && goalData.routine.length > 0 ? (
                                        goalData.routine.map((routine, routineIndex) => (
                                            <p key={routineIndex} className="text-sm md:text-base text-gray-400">{routine}</p>
                                        ))
                                    ) : (
                                        <p className="text-sm md:text-base text-gray-400">No routine available</p>
                                    )}
                                </div>

                                <div className="mt-4 pt-3 border-t border-red-600/10">
                                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                                        <div className="flex items-center space-x-2">
                                            <FiCalendar className="w-4 h-4 text-red-400" />
                                            <span className="text-xs text-gray-400">
                                                Started: {new Date(goalData.startDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {goalData.status !== "Complete" && (
                                            <button
                                                onClick={() => handleComplete(index)}
                                                className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Mark as Complete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profile Edit Modal remains the same */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-gradient-to-br from-black to-red-950 rounded-xl p-8 max-w-md w-full m-4 border border-red-800 shadow-2xl">
                            <div className="flex justify-between items-center mb-6 border-b border-red-800 pb-4">
                                <h3 className="text-2xl font-bold text-red-500">Edit Profile</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                >
                                    <GiTireIronCross className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: "Name", name: "name", type: "text" },
                                    { label: "Age", name: "age", type: "number" },
                                    { label: "Height (cm)", name: "height", type: "number" },
                                    { label: "Weight (kg)", name: "weight", type: "number" },
                                ].map((field) => (
                                    <div key={field.name} className="group">
                                        <label className="block text-red-400 mb-2 text-sm font-medium">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/50 text-white rounded-lg p-3 border border-red-900/50 
                             focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none
                             transition-all duration-200 placeholder-red-900"
                                        />
                                    </div>
                                ))}

                                <button
                                    onClick={handleProfileSubmit}
                                    className="w-full bg-gradient-to-r from-red-800 to-red-600 text-white px-6 py-3 rounded-lg
                         hover:from-red-700 hover:to-red-500 transform hover:-translate-y-0.5 
                         transition-all duration-200 font-medium shadow-lg shadow-red-900/30
                         focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}{/* Goal Modal */}
                {isGoalModalOpen && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-gradient-to-br from-black via-red-950 to-black rounded-xl p-8 max-w-md w-full m-4 
                         border border-red-800/50 shadow-2xl relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-800/10 rounded-full blur-2xl" />

                            <div className="relative">
                                <div className="flex justify-between items-center mb-6 border-b border-red-800/30 pb-4">
                                    <div className="flex items-center gap-2">
                                        <FiTarget className="w-6 h-6 text-red-500" />
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                                            Add New Fitness Goal
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setIsGoalModalOpen(false)}
                                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                    >
                                        <GiTireIronCross className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {!showCustomGoalForm ? (
                                        <div className="group">
                                            <label className="flex items-center gap-2 text-red-400 mb-2 text-sm font-medium">
                                                <LuListChecks className="w-4 h-4" />
                                                Select Goal
                                            </label>
                                            <select
                                                value={currentGoal}
                                                onChange={(e) => handleGoalSelect(e.target.value)}
                                                className="w-full bg-black/50 text-white rounded-lg p-3 border border-red-900/50
                               focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none
                               transition-all duration-200 appearance-none"
                                            >
                                                <option value="">Select Goal</option>
                                                {Object.keys(routines).map((goal) => (
                                                    <option key={goal} value={goal}>{goal}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="group">

                                            <input
                                                type="text"
                                                value={customGoal}
                                                onChange={(e) => setCustomGoal(e.target.value)}
                                                className="w-full bg-black/50 text-white rounded-lg p-3 border border-red-900/50
                               focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none
                               transition-all duration-200 placeholder-red-900"
                                                placeholder="Enter your custom goal"
                                            />
                                        </div>
                                    )}



                                    <button
                                        onClick={handleSaveGoal}
                                        className="w-full bg-gradient-to-r from-red-800 to-red-600 text-white px-6 py-3 rounded-lg
                           hover:from-red-700 hover:to-red-500 transform hover:-translate-y-0.5 
                           transition-all duration-200 font-medium shadow-lg shadow-red-900/30
                           focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                                    >
                                        Save Goal
                                    </button>
                                </div>

                                {/* Preview selected routine */}
                                {currentGoal && routines[currentGoal] && (
                                    <div className="mt-8 bg-black/30 rounded-lg p-4 border border-red-900/30">
                                        <h4 className="text-lg font-semibold text-red-400 flex items-center gap-2">
                                            <LuListChecks className="w-5 h-5" />
                                            Recommended Routine
                                        </h4>
                                        <ul className="text-gray-300 space-y-2 mt-3">
                                            {routines[currentGoal].routine.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;