import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAuth from '../../Hooks/useAuth';
import SharedTitle from '../../Components/Shared/SharedTitle';

const NutrationDashboard = () => {
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState([]);
  const [weekNumber, setWeekNumber] = useState(50);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null); // Reset error before making a new request
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/week/${weekNumber}`);
        const filteredData = response?.data?.filter(item => item.email === user?.email);

        if (!filteredData || filteredData.length === 0) {
          throw new Error('No data available for this week.');
        }

        const formattedData = filteredData.map(item => ({
          day: item.day,
          calories: item.totalCal,
          protein: item.meals?.protein?.reduce((a, b) => a + b, 0) || 0,
          carbs: item.meals?.carbs?.reduce((a, b) => a + b, 0) || 0,
          fat: item.meals?.fat?.reduce((a, b) => a + b, 0) || 0,
        }));

        setWeeklyData(formattedData);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
        setError(error.message || 'An error occurred while fetching data.');
        setWeeklyData([]); // Clear any previous data
      }
    };

    fetchData();
  }, [weekNumber, user]);

  const handleWeekChange = (event) => {
    setWeekNumber(event.target.value);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-black">
      <SharedTitle heading="Weekly Nutration Summary"/>
      {/* <h1 className="text-3xl font-bold text-red-500 mb-8 text-center md:text-left">Weekly Nutration Summary</h1> */}

      <div className="mb-4 flex flex-col md:flex-row items-center justify-between">
        <label htmlFor="weekNumber" className="text-red-500">Select Week:</label>
        <select
          id="weekNumber"
          value={weekNumber}
          onChange={handleWeekChange}
          className="mt-2 md:mt-0 p-2 bg-gray-800 text-red-500 rounded"
        >
          {[...Array(52).keys()].map(week => (
            <option key={week} value={week + 1}>{`Week ${week + 1}`}</option>
          ))}
        </select>
      </div>

      <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-red-800">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Weekly Progress</h2>

        {error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          weeklyData.length > 0 ? (
            <div className="h-64 sm:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#f87171" />
                  <YAxis stroke="#f87171" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #991b1b',
                      color: '#f87171',
                    }}
                  />
                  <Line type="monotone" dataKey="calories" stroke="#dc2626" strokeWidth={2} />
                  <Line type="monotone" dataKey="protein" stroke="#9f1239" strokeWidth={2} />
                  <Line type="monotone" dataKey="carbs" stroke="#fbbf24" strokeWidth={2} />
                  <Line type="monotone" dataKey="fat" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-red-400">Loading data...</p>
          )
        )}
      </div>
    </div>
  );
};

export default NutrationDashboard;
