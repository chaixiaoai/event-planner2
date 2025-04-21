import React from "react";

const Navbar = ({ navigateToProducts, setShowDetails, showDetails }) => {
  return (
    <navbar className="navbar_event_conference">
      <div className="company_logo">Conference Expense Planner</div>
      <div className="left_navbar">
        <div className="nav_links">
          <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
          <a href="#addons" onClick={() => navigateToProducts("#addons")}>Add-ons</a>
          <a href="#meals" onClick={() => navigateToProducts("#meals")}>Meals</a>
        </div>
        <button className="details_button" onClick={() => setShowDetails(!showDetails)}>
          Show Details
        </button>
      </div>
    </navbar>
  );
};

export default Navbar;
