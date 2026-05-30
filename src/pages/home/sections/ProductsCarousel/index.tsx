import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import { productsService } from "../../../../services/products.service";
import { VariantPickerModal, type ProductForCart } from "../../../../components/VariantPickerModal";

interface StoreProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export const ProductsCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [pickerProduct, setPickerProduct] = useState<ProductForCart | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productsService.getProducts();
        setProducts(data.slice(0, 12));
      } catch {
        setProducts([]);
      }
    };
    load();
  }, []);

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Featured Products</h2>
        <p className="text-gray-600">Check back soon for new items.</p>
        <Link to="/products" className="inline-block mt-4 text-purple-600 underline">
          Browse shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">Featured Products</h2>
      <div className="relative px-12 md:px-16 lg:px-40">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            815: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1280: { slidesPerView: 4, spaceBetween: 50 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!pb-12 products-carousel"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to={`/products/${product._id}`}>
                  <div className="aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                      src={product.images?.[0] || "https://via.placeholder.com/300?text=Product"}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPickerProduct({
                          _id: product._id,
                          title: product.title,
                          price: product.price,
                          images: product.images,
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-20 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 hidden md:flex"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-20 cursor-pointer top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 hidden md:flex"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <VariantPickerModal
        open={Boolean(pickerProduct)}
        onClose={() => setPickerProduct(null)}
        product={pickerProduct}
      />
    </div>
  );
};
