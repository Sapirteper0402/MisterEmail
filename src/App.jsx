import { HashRouter as Router, Route, Routes, NavLink, Navigate } from "react-router-dom";

import { AboutUs } from "./pages/AboutUs";
import { HomePage } from "./pages/HomePage";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";
// import { useState } from "react";

export function App() {
//   const [page, setPage] = useState("HomePage");
    return (
      <Router>
      
        <section className='main-app'>
          <header className="app-header">
            <section className="container">
              <NavLink className="nav-link" to="HomePage">Home Page</NavLink>
              <NavLink className="nav-link" to="EmailIndex">Email Index</NavLink>
              <NavLink className="nav-link" to="AboutUs">About Us</NavLink>
            </section>
          </header>

          <main className="container">
            <Routes>
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/EmailIndex" element={<EmailIndex />} />
              <Route path="/EmailIndex/:emailId" element={<EmailDetails />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route index element={<Navigate to='/HomePage' />} />
            </Routes>
          </main>

          <footer>
            <section className="container">
                Mails 2023 &copy;
            </section>
          </footer>
        </section>

      </Router>
    )
}

