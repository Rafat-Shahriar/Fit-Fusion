import { BsActivity, BsClock, BsHeart, BsTrophy } from 'react-icons/bs';
import { FaLaptopMedical } from 'react-icons/fa';
import { MdScale } from 'react-icons/md';
import SharedTitle from '../Shared/SharedTitle';

const FitnessTracking = () => {
    const metrics = [
        {
            title: "Daily Steps",
            value: "8,439",
            target: "Target: 10,000",
            icon: <BsActivity className="h-6 w-6 text-rose-500" />,
            change: "+12%",
            description: "Keep moving to reach your daily goal"
        },
        {
            title: "Heart Rate",
            value: "72 BPM",
            target: "Zone: Healthy",
            icon: <BsHeart className="h-6 w-6 text-rose-500" />,
            change: "Normal",
            description: "Average resting heart rate"
        },
        {
            title: "Calories Burned",
            value: "487",
            target: "Target: 600",
            icon: <FaLaptopMedical className="h-6 w-6 text-rose-500" />,
            change: "+24%",
            description: "Active calories burned today"
        },
        {
            title: "Weekly Goals",
            value: "4/7",
            target: "Days Active",
            icon: <BsTrophy className="h-6 w-6 text-rose-500" />,
            change: "+1",
            description: "Keep up the momentum!"
        },
        {
            title: "Current Weight",
            value: "68 kg",
            target: "Target: 65 kg",
            icon: <MdScale className="h-6 w-6 text-rose-500" />,
            change: "-0.5kg",
            description: "Weekly weight tracking"
        },
        {
            title: "Active Minutes",
            value: "47 min",
            target: "Target: 60 min",
            icon: <BsClock className="h-6 w-6 text-rose-500" />,
            change: "+15min",
            description: "Daily activity duration"
        }
    ];

    return (
        <section className="bg-gray-900 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <SharedTitle heading="Track Your Fitness Journey" subHeading="Monitor your daily progress and achieve your fitness goals with our comprehensive tracking system"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-rose-500/50 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-medium text-sm">
                                    {metric.title}
                                </h3>
                                {metric.icon}
                            </div>

                            <div className="space-y-4">
                                <div className="text-2xl font-bold text-white">{metric.value}</div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">{metric.target}</p>
                                    <span className="text-sm font-medium text-rose-500">
                                        {metric.change}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">{metric.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FitnessTracking;