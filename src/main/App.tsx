import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { LoanComponent } from '../loananalysiscomponent/loananaylsis';
import './App.css';
function App() {
  return (
    <BrowserRouter>          
    <Navbar/>
    <Routes>
        <Route path="/home" />
        <Route path="/assets" />
        <Route path="/loans" element={<LoanComponent/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
