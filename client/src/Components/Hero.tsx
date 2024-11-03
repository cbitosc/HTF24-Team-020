import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="relative bg-gray-800 py-8">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                    <img
                        src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png"
                        className="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg"
                        alt="Laptop Mockup"
                    />
                    <img
                        src="/images/image1.jpg"
                        className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
                        alt="Dark Mode Laptop"
                    />
                </div>
            </div>
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
            </div>
            <div className="text-center mt-6">
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                    Unlock Your Potential
                </h1>
                <p className="mt-4 text-lg text-gray-300 sm:max-w-md md:max-w-lg mx-auto">
                    Join us in exploring the latest technologies that will elevate your skills and drive your career forward.
                </p>
                <a
                    href="#"
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-blue-600 bg-white rounded-lg shadow hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Get Started
                </a>
            </div>
        </div>
    );
};

export default Hero;
