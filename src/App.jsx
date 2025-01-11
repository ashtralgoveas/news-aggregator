import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { ScrollableContainer } from "./components/ScrollableContainer/index";

function App() {
  return (
    <>
      <ScrollableContainer fluid>
        <NavBar />
        <Outlet />
      </ScrollableContainer>
    </>
  );
}

export default App;
