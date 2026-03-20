export const CategoriesSection = () => {
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
        <div className="part1pic w-full h-full flex justify-center items-center ">
          <h1 className="text-white text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Gaming Accessories
          </h1>
        </div>
        <div className="part2pic w-full h-full flex justify-center items-center">
          <h1 className="text-white text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Display Electronics
          </h1>
        </div>
        <div className="part3pic w-full h-full flex justify-center items-center">
          <h1 className="text-white text-center sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Electronic Gadgets
          </h1>
        </div>
      </div>
    </div>
  );
};
