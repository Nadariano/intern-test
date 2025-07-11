import { Route, Routes } from "react-router-dom";

import Body from './components/body/main';
import Footer from './components/footer/main';
import Header from './components/header/main';

import AboutUs from './components/pages/aboutus';
import Dashboard from './components/pages/dashboard';

export default function App() {
  return (
    <div className="max-h-full flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}
