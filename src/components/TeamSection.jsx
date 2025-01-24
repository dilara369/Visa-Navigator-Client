import { Fade, Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sophia Reynolds",
      designation: "Immigration Consultant",
      img: "https://i.ibb.co.com/s6HMshF/Screenshot-2024-11-19-071742.png",
    },
    {
      name: "James Mitchell",
      designation: "Legal Analyst",
      img: "https://i.ibb.co.com/BKRJms2/Screenshot-2024-11-19-071713.png",
    },
    {
      name: "Emma Johnson",
      designation: "Visa Application Specialist",
      img: "https://i.ibb.co.com/Qj8HF36/Screenshot-2024-11-19-071658.png",
    },
    {
      name: "Oliver Carter",
      designation: "Document Verification Expert",
      img: "https://i.ibb.co.com/jy7rS8q/Screenshot-2024-11-19-071629.png",
    },
    {
      name: "Mia Peterson",
      designation: "Client Support Lead",
      img: "https://i.ibb.co.com/s6HMshF/Screenshot-2024-11-19-071742.png",
    },
    {
      name: "Liam Thompson",
      designation: "Regional Manager",
      img: "https://i.ibb.co.com/Fm0T6wb/Screenshot-2024-11-19-071645.png",
    },
  ];
  

  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title Section */}
        <Fade>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
            Meet Our{" "}
            <span className="text-lime-500">
              <Typewriter
                words={["Trusted Team", "Immigration Experts"]}
                loop={false}
                typeSpeed={100}
                deleteSpeed={100}
              />
            </span>
          </h2>
        </Fade>
      </div>

      {/* Team Members Section */}
      <Slide direction="up" cascade>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center transition hover:shadow-xl hover:-translate-y-2 duration-300"
            >
              {/* Team Member Image */}
              <div className="relative mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover shadow-md"
                />
              </div>
              {/* Team Member Info */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {member.designation}
              </p>
            </div>
          ))}
        </div>
      </Slide>
    </section>
  );
};

export default TeamSection;
