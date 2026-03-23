import Banner from "../../components/Banner";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
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
                <div className=" w-full h-full flex flex-col justify-center items-center gap-6">
                    <h1 className="text-4xl font-bold text-white text-center">
                        Discover Endless Possibilities
                    </h1>
                    <h1 className="text-xl font-bold text-white text-center">
                        Explore items handpicked to enhance your everyday experiences.
                    </h1>
                    <ButtonComponent
                        text="Get Started"
                        color="#9810fa"
                        style={{ padding: "10px 20px", borderRadius: "24px" }}
                    />
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