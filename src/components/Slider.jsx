import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Slider = () => {
  const slides = [
    {
      image: "https://i.ibb.co/PCc6k8t/Screenshot-2025-01-23-120651.png",
      caption: "Slide 1: Beautiful Scenery",
    },
    {
      image: "https://i.ibb.co/QkdZRjQ/Screenshot-2025-01-23-120448.png",
      caption: "Slide 2: Amazing Architecture",
    },
    {
      image: "https://i.ibb.co/Ns0WgjH/Screenshot-2025-01-23-120537.png",
      caption: "Slide 3: Stunning Sunset",
    },
    {
      image: "https://i.ibb.co/51ytQRq/Screenshot-2025-01-23-120601.png",
      caption: "Slide 4: Serene Landscape",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-10 overflow-hidden rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
      {/* Slide Content */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-80 relative flex-shrink-0"
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white py-2 px-4 rounded-md">
              {slide.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black"
      >
        <MdKeyboardArrowLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black"
      >
        <MdKeyboardArrowRight size={30} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-blue-500 dark:bg-blue-400"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;