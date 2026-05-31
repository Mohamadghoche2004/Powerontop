import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import { ButtonComponent } from "../../components/ui/Button";
import { AboutUsSection } from "./sections/AboutUsSection";
import { CategoriesSection } from "./sections/CategoriesSection";
import { FaqSection } from "./sections/FaqSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { ProductsCarousel } from "./sections/ProductsCarousel";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection";

export const Home = () => {
    return (
        <>
            <div className="firstSection flex flex-col justify-center items-center">
                <div className="w-full h-full flex flex-col justify-center items-center gap-4 sm:gap-6 px-2">
                    <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">
                        Discover Endless Possibilities
                    </h1>
                    <p className="text-base sm:text-xl font-bold text-white text-center">
                        Explore items handpicked to enhance your everyday experiences.
                    </p>
                    <Link to="/products">
                        <ButtonComponent
                            text="Get Started"
                            color="#9810fa"
                            style={{ padding: "10px 20px", borderRadius: "24px" }}
                        />
                    </Link>
                </div>
            </div>
            <ProductsCarousel />
            <CategoriesSection />
            <FaqSection />
            <WhyChooseUsSection />
            <HowItWorksSection />
            <Banner />
            <AboutUsSection />
        </>
    );
};