import { HashRouter as Router, Route, Routes, NavLink } from "react-router-dom";

import { AboutUs } from "./pages/AboutUs";
import { HomePage } from "./pages/HomePage";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";
// import { useState } from "react";

export function App() {
  //   const [page, setPage] = useState("HomePage");
  return (
    <Router>
      <section className="main-app">
        <header className="app-header">
          <section className="container">
            <nav>
              <NavLink to="/">Home Page</NavLink>
              <NavLink to="/EmailIndex">Email Index</NavLink>
              <NavLink to="/AboutUs">About Us</NavLink>
            </nav>
          </section>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/EmailIndex" element={<EmailIndex />} />
            <Route path="/EmailIndex/:emailId" element={<EmailDetails />} />
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
        </main>

        <footer>
          <section className="container">Mails 2023 &copy;</section>
        </footer>
      </section>
    </Router>
  );
}
