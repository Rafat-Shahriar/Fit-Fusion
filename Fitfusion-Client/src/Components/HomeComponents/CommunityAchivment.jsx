
import Lottie from 'lottie-react';
import achievement1 from '../../assets/Animation/Achivment1.json';
import achievement2 from '../../assets/Animation/Achivment2.json';
import achievement3 from '../../assets/Animation/Achivment3.json';
import achievement4 from '../../assets/Animation/Achivment4.json';
import SharedTitle from '../Shared/SharedTitle';

const CommunityAchievements = () => {
    const achievements = [
        {
            title: "Elite Trainer",
            description: "Helped 100+ members reach their fitness goals",
            animation: achievement4,
            color: "text-red-500"
        },
        {
            title: "Workout Master",
            description: "Completed 500 workout sessions",
            animation: achievement2,
            color: "text-red-500"
        },
        {
            title: "Community Leader",
            description: "Top contributor in community forums",
            animation: achievement3,
            color: "text-red-500"
        },
        {
            title: "Consistency King",
            description: "90-day workout streak achieved",
            animation: achievement1,
            color: "text-red-500"
        }
    ];

    return (
        <section className="bg-gray-900 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <SharedTitle heading="Community Achievements"/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((achievement, index) => (
                        <div 
                            key={index} 
                            className="bg-black p-6 rounded-xl border border-red-500/20 text-center hover:border-red-500/40 transition-all duration-300"
                        >
                            <div className="w-24 h-24 mx-auto mb-4">
                                <Lottie
                                    animationData={achievement.animation}
                                    loop={true}
                                />
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${achievement.color}`}>
                                {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {achievement.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunityAchievements;