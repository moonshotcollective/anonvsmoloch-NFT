import React, { useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <nav className="navBar">
      <button type="button" onClick={handleToggle}>
        {navbarOpen ? (
          <MenuOutlined style={{ color: "#fff", width: "40px", height: "40px" }} />
        ) : (
          <CloseOutlined style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
        )}
      </button>
      <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>...</ul>
    </nav>
  );
}

export default Navbar;
