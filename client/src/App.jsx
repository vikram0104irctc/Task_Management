import "./App.css";
import { Home } from "./components/home";
import LoginForm from "./components/login";
import { Navbar } from "./components/navbar";
import SignupForm from "./components/signup";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./private/privateroute";
import DetailsPage from "./components/detailspage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute Component={Home} />} />
        <Route
          path="/detailspage"
          element={<PrivateRoute Component={DetailsPage} />}
        />
        <Route path="/login" exact element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </>
  );
}

export default App;
