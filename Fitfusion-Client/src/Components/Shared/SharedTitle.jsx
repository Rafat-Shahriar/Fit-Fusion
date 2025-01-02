const SharedTitle = ({ heading, subHeading }) => {
  return (
    <div className="max-w-4xl mx-auto text-center my-8 md:my-16 px-4 relative">
      <div className="relative">
        <div className="relative inline-block">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600">
            {heading}
          </h3>
          {/* Underline effect - visible on all screens */}
          <div className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Left decorative lines - hidden on mobile, visible on medium screens and up */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 lg:pr-8">
          <div className="w-8 lg:w-16 h-1 bg-red-500 transform -rotate-45" />
          <div className="w-6 lg:w-12 h-1 bg-red-500/50 transform -rotate-45 mt-4" />
        </div>

        {/* Right decorative lines - hidden on mobile, visible on medium screens and up */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 lg:pl-8">
          <div className="w-8 lg:w-16 h-1 bg-red-500 transform rotate-45" />
          <div className="w-6 lg:w-12 h-1 bg-red-500/50 transform rotate-45 mt-4" />
        </div>
      </div>

      {/* Optional subheading */}
      {subHeading && (
        <p className="mt-4 text-sm md:text-base lg:text-lg text-gray-600">
          {subHeading}
        </p>
      )}
    </div>
  );
};

export default SharedTitle;