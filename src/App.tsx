import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import "./App.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
