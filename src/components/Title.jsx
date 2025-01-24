import PropTypes from "prop-types";

const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center my-8">
      <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-blue-500">
        {title}
      </h1>
      <p className="text-gray-700 md:text-lg mt-4">{subtitle}</p>
    </div>
  );
};

// Prop validation
Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Title;
