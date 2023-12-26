import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { AboutUs } from "./pages/AboutUs";
import { HomePage } from "./pages/HomePage";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";
import { AppHeader } from "./cmps/AppHeader";
import { EmailCompose } from "./cmps/EmailCompose";
// import { useState } from "react";

export function App() {
  //   const [page, setPage] = useState("HomePage");
  return (
    <Router>
      <section className="main-app">

       <AppHeader/>

        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/EmailIndex" element={<EmailIndex />}>
             <Route path="/EmailIndex/add" element={<EmailCompose />} />
            </Route>
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
