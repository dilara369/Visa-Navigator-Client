const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      image: "https://i.ibb.co.com/s6HMshF/Screenshot-2024-11-19-071742.png",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/BKRJms2/Screenshot-2024-11-19-071713.png",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/Qj8HF36/Screenshot-2024-11-19-071658.png",
    },
    {
      id: 4,
      image: "https://i.ibb.co.com/jy7rS8q/Screenshot-2024-11-19-071629.png",
    },
    {
      id: 5,
      image: "https://i.ibb.co.com/Fm0T6wb/Screenshot-2024-11-19-071645.png",
    },
  ];

  return (
    <div className="py-10 overflow-hidden bg-gray-50">
      <div className="relative">
        <div className="flex items-center space-x-10 animate-horizontal-scroll">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-md"
            >
              <img
                src={testimonial.image}
                alt={`Testimonial ${testimonial.id}`}
                className="object-contain h-28 w-28 rounded-full"
              />
            </div>
          ))}
          {/* Duplicate items for seamless animation */}
          {testimonials.map((testimonial) => (
            <div
              key={`${testimonial.id}-duplicate`}
              className="flex-shrink-0 w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-md"
            >
              <img
                src={testimonial.image}
                alt={`Testimonial ${testimonial.id}`}
                className="object-contain h-28 w-28 rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
