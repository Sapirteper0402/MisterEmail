import { NavLink } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="container">
        <nav>
          <NavLink to="/">Home Page</NavLink>
          <NavLink to="/mail/index">Email Index</NavLink>
          <NavLink to="/AboutUs">About Us</NavLink>
        </nav>
      </section>
    </header>
  );
}
