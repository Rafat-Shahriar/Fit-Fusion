import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <img className="w-24 mx-auto md:mx-0" src={logo} alt="Fitness Logo" />
            <p className="mt-2 text-gray-400 text-lg max-w-xs mx-auto md:mx-0">
              Fitness for everyone, anywhere. Access expert workouts, anytime, and start your journey today.
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <ul className="text-center md:text-left">
              <li>
                <a href="#" className="hover:text-pink-400 text-lg">Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 text-lg">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 text-lg">About Us</a>
              </li>
            </ul>

            <ul className="text-center md:text-left">
              <li>
                <a href="#" className="hover:text-pink-400 text-lg">Fitness Programs</a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 text-lg">Platform</a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 text-lg">Workout Library</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center">
          <p className="text-gray-400 text-sm">&copy; 2024  Fit Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
