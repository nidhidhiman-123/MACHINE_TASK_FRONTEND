import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddEmployee from "./pages/addEmployee";
import AllData from "./pages/allData";
import Edit from "./pages/edit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Routes>

            <Route exact path="/" element={<AddEmployee />} />

            <Route exact path="/alldata" element={<AllData />} />

            <Route exact path="/edit/:id" element={<Edit />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
