import React from 'react';

const Pocket: React.FC = () => {
    const cards = [
        {
            title: "Packers and Movers",
            description: "Reliable and efficient moving services to make your relocation stress-free.",
            image: '/images/pic1.webp',
            link: "#"
        },
        {
            title: "Repairs at your doorstep",
            description: "Get professional repair services at your convenience, right at your home.",
            image: "/images/pic2.webp",
            link: "#"
        },
        {
            title: "Real Estate Hotspots",
            description: "Explore trending properties in prime locations to find your perfect home.",
            image: "/images/pic3.webp",
            link: "#"
        },
        {
            title: "Modern Interiors",
            description: "Upgrade your space with contemporary interior design solutions tailored to your style.",
            image: '/images/pic4.png',
            link: "#"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div 
                    key={index} 
                    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
                >
                    <a href={card.link}>
                        <img className="rounded-t-lg w-full h-48 object-cover" src={card.image} alt={card.title} />
                    </a>
                    <div className="p-5">
                        <a href={card.link}>
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black">{card.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
                        <a href={card.link} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Pocket;