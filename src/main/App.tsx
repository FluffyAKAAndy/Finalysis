import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { LoanComponent } from '../loananalysiscomponent/loananaylsis';
import './App.css';
import { AssetComponent } from "../assetscomponent/assets";
function App() {

  return (
    <BrowserRouter>          
    <Navbar/>
    <Routes>
        <Route path="/home" />
        <Route path="/assets" element={<AssetComponent/>}/>
        <Route path="/loans" element={<LoanComponent/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
