const Banner = () => {
  const bannerItems = [
    "🎉 Special Offer: Get 20% off on all products!",
    "🚚 Free shipping on orders over $50",
    "⭐ New arrivals: Check out our latest collection",
    "💎 Premium quality guaranteed",
    "🎁 Limited time: Buy 2 Get 1 Free",
  ];

  return (
    <div className="  bg-purple-600 text-white overflow-hidden h-10">
      <div className="flex items-center h-full animate-scroll">
        {bannerItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center px-8 text-sm font-medium whitespace-nowrap"
          >
            {item}
          </div>
        ))}
        {/* Duplicate items for seamless loop */}
        {bannerItems.map((item, index) => (
          <div
            key={`duplicate-${index}`}
            className="inline-flex items-center px-8 text-sm font-medium whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
