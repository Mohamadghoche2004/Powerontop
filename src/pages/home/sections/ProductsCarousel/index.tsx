import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

type ProductsCarouselProps = {
  products?: Product[];
};

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    image: "https://via.placeholder.com/300x300?text=Product+1",
    description: "Amazing product description",
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
    image: "https://via.placeholder.com/300x300?text=Product+2",
    description: "Amazing product description",
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
    image: "https://via.placeholder.com/300x300?text=Product+3",
    description: "Amazing product description",
  },
  {
    id: 4,
    name: "Product 4",
    price: 59.99,
    image: "https://via.placeholder.com/300x300?text=Product+4",
    description: "Amazing product description",
  },
  {
    id: 5,
    name: "Product 5",
    price: 69.99,
    image: "https://via.placeholder.com/300x300?text=Product+5",
    description: "Amazing product description",
  },
  {
    id: 6,
    name: "Product 6",
    price: 79.99,
    image: "https://via.placeholder.com/300x300?text=Product+6",
    description: "Amazing product description",
  },
];

export const ProductsCarousel = ({ products = defaultProducts }: ProductsCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">
        Featured Products
      </h2>
      <div className="relative px-12 md:px-16 lg:px-40">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            815: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-12 products-carousel"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-20 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-20 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
