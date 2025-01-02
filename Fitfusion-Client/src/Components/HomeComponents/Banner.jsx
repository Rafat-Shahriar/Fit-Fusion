import { Link } from 'react-router-dom';
import banner from '../../assets/Banner.png';

import React from 'react';

const Banner = () => {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full"
            style={{
                backgroundImage: `url(${banner})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Animated Elements */}
            <div className="absolute inset-0">
                {/* Top left animated box */}
                <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 
                             w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 
                             border-2 border-red-500 animate-bounce"></div>
                
                {/* Bottom right animated circle */}
                <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-8 sm:right-12 md:right-16 
                             w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 
                             rounded-full border-2 border-white animate-slide"></div>
            </div>

            {/* Main Content */}
            <div className="relative flex flex-col items-center justify-center text-center min-h-screen text-white 
                        px-4 sm:px-6 md:px-8 lg:px-12">
                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4 sm:mb-6 
                           tracking-wider sm:tracking-widest
                           animate-fade-in">
                    Fitness Gym
                </h1>

                {/* Features List */}
                <ul className="text-xs sm:text-sm md:text-base lg:text-lg 
                           space-y-1 sm:space-y-2 mb-4 sm:mb-6
                           max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                    <li className="flex items-center justify-center space-x-2">
                        <span className="text-red-500">•</span>
                        <span>Gym with modern equipment</span>
                    </li>
                    <li className="flex items-center justify-center space-x-2">
                        <span className="text-red-500">•</span>
                        <span>Individual training with a trainer</span>
                    </li>
                    <li className="flex items-center justify-center space-x-2">
                        <span className="text-red-500">•</span>
                        <span>Group training (aerobics, yoga, Pilates, zumba, etc.)</span>
                    </li>
                </ul>

                {/* CTA Button */}
                <Link
                    to="/signup"
                    className="bg-red-500 px-4 sm:px-6 py-2 text-sm sm:text-base md:text-lg 
                           rounded-full font-semibold 
                           hover:bg-red-600 transition-all duration-300
                           transform hover:scale-105
                           shadow-lg hover:shadow-xl"
                >
                    JOIN US
                </Link>
            </div>

            {/* Animations */}
            <style>
                {`
                @keyframes slide {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(20px); }
                }

                .animate-slide {
                    animation: slide 3s ease-in-out infinite;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in {
                    animation: fadeIn 1s ease-out forwards;
                }
                `}
            </style>
        </div>
    );
};

export default Banner;
