import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EliteDentalStudio from "./pages/EliteDentalStudio";
import OurServicesLayout from "./pages/OurServicesLayout";
import AboutUs from "./pages/aboutUs";
import Contact from './pages/Contact';
import Account from './pages/Account';
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword"; 
import BookAppointment from "./pages/BookAppointment";
import Appbar from "./components/Appbar"; // ✅ Import Appbar
import ThankYou from "./pages/ThankYou";
import CheckInsurance from "./pages/CheckInsurance"
import "@fontsource/playfair-display";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";

function App() {
  return (
    <Router>
      <Appbar /> {/* ✅ Move Appbar OUTSIDE of <Routes> */}
      <Routes>
        <Route path="/" element={<EliteDentalStudio />} />
        <Route path="/services" element={<OurServicesLayout />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/ThankYou" element={<ThankYou/>} />
        <Route path="/checkinsurance" element={<CheckInsurance/>} />
      </Routes>
    </Router>
  );
}

export default App;