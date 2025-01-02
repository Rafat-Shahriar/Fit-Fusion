import Lottie from "lottie-react";
import { BsChevronRight, BsStar } from "react-icons/bs";
import animationData from "../../assets/Animation/Track.json"


const CalltoAction = () => {
    return (
        <div className="bg-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full -translate-y-1/2 translate-x-1/2 backdrop-blur-xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/20 rounded-full translate-y-1/2 -translate-x-1/2 backdrop-blur-xl" />

                    <div className="relative p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    Transform Your
                                    <span className="block text-black">Fitness Journey</span>
                                </h2>
                                <div className="space-y-3">
                                    {['Personal Trainer', 'Custom Diet Plan', 'Progress Tracking'].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-white/90">
                                            <BsStar className="w-4 h-4 text-black" fill="currentColor" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="group w-full bg-white hover:bg-gray-100 text-red-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                                    <span className="flex items-center justify-center gap-2">
                                        Start Your Journey
                                        <BsChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>

                            {/* Right Column - CTA */}
                            <div className="space-y-6">
                                <div className="w-full mx-auto mb-4">
                                    <Lottie
                                        animationData={animationData}
                                        loop={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalltoAction;