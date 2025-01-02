import { useEffect, useState } from 'react';
import { FaUser, FaClock, FaFire, FaTrophy } from 'react-icons/fa';

const GoalsAndRoutines = () => {
  const [userData, setUserData] = useState([]);
  console.log(userData);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        const data = await response.json();

        // Check if data exists and is an array
        if (Array.isArray(data) && data.length > 0) {
          // Map through users and filter their goals, with validation
          const filteredData = data.map(user => ({
            ...user,
            goals: Array.isArray(user?.goals)
              ? user.goals.filter(goal =>
                goal?.status === "Complete" || goal?.status === "In Progress"
              )
              : []
          }));
          setUserData(filteredData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Member Goals and Daily Routines
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData?.map((user) => (
            <div
              key={user?._id}
              className="relative bg-gray-900 border-2 border-red-800/30 rounded-xl p-6 hover:shadow-2xl hover:shadow-red-900/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-red-800 p-3 rounded-lg">
                  <FaUser className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {user?.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {user?.goals?.map((goalItem, index) => (
                  <div key={index} className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <FaTrophy className="text-xl text-red-500" />
                          <h3 className="text-lg font-semibold text-white">Goal</h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${goalItem?.status === 'Complete'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                          {goalItem?.status}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-800/30 rounded-lg p-4 text-red-200 flex items-center gap-2">
                        <FaFire className="text-red-500" />
                        {goalItem?.goal}
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-red-800/50 to-transparent my-4" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FaClock className="text-xl text-red-500" />
                        <h3 className="text-lg font-semibold text-white">Routines</h3>
                      </div>
                      <div className="grid gap-2">
                        {goalItem?.routine?.map((routine, routineIndex) => (
                          <div
                            key={routineIndex}
                            className="bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-800/30 rounded-lg p-4 text-red-200 hover:border-red-500/50 transition-colors duration-300"
                          >
                            {routine}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsAndRoutines;