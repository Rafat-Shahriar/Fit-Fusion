import { FaCalendar, FaChartLine } from 'react-icons/fa';
import { BsActivity } from "react-icons/bs";
import SharedTitle from '../Shared/SharedTitle';
const Feature = () => {
    const features = [
        { icon: <FaCalendar className="w-8 h-8 text-red-500" />, title: "Workout Planning", description: "Customize and schedule your workouts with our intuitive planning tools" },
        { icon: <BsActivity className="w-8 h-8 text-red-500" />, title: "Nutrition Tracking", description: "Monitor your daily nutrition intake and maintain a balanced diet" },
        { icon: <FaChartLine className="w-8 h-8 text-red-500" />, title: "Progress Analytics", description: "Track your fitness journey with detailed analytics and insights" }
    ];
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <SharedTitle heading="Features That Empower You"/>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-900 p-6 rounded-xl border border-red-500/20">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Feature;