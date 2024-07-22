import { Outlet } from "react-router-dom";
import "./App.css";
import { NavbarDefault } from "./Components/Navbar";

function App() {
  return (
    <div>
      <NavbarDefault />
      <Outlet />
    </div>
  );
}

export default App;
