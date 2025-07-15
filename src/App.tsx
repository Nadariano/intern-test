import { Route, Routes } from "react-router-dom";

import Body from './components/main/body/layout';
import Footer from './components/main/footer/layout';
import Header from './components/main/header/layout';

import AboutUs from './components/pages/aboutus';
import Home from './components/pages/home';
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="max-h-full flex flex-col">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}
