import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { AboutUs } from "./pages/AboutUs";
import { HomePage } from "./pages/HomePage";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";
import { AppHeader } from "./cmps/AppHeader";


export function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mail" element={<EmailIndex />} />

          <Route path="/mail/:folder" element={<EmailIndex />}>
            <Route path="/mail/:folder/:emailId" element={<EmailDetails />} /> 
          </Route>
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

// <Route path="/mail/:folder" element={<EmailIndex />} />

// <main className="container">
// <Routes>
//   <Route path="/" element={<HomePage />} />
//   <Route path="/mail" element={<EmailIndex />}>
//     <Route path="/mail/add" element={<EmailCompose />} /> 
//   </Route>
//   <Route path="/mail/:emailId" element={<EmailDetails />} />
//   <Route path="/AboutUs" element={<AboutUs />} />
// </Routes>
// </main>



// <main className="container">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/mail" element={<EmailIndex />}>
//               <Route path="/mail/add" element={<EmailCompose />} /> 
//             </Route>
//             <Route path="/mail/:emailId" element={<EmailDetails />} />
//             <Route path="/AboutUs" element={<AboutUs />} />
//           </Routes>
//         </main>



// <main className="container">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/mail" element={<EmailIndex />}/>

//             <Route path="/mail/:emailId" element={<EmailDetails />} />
//             <Route path="/AboutUs" element={<AboutUs />} />
//           </Routes>
//         </main>


// <main className="container">
//           <Routes>
//             <Route path="/" element={<HomePage />} />

//             <Route path="/mail" element={<EmailIndex />}>
//               <Route path="/mail/:emailId" element={<EmailDetails />} /> 
//             </Route>

//             <Route path="/AboutUs" element={<AboutUs />} />
//           </Routes>
//         </main>