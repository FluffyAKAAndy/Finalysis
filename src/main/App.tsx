import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import { LoanComponent } from '../loananalysiscomponent/loananaylsis';
import { AssetComponent } from "../assetscomponent/assets";
import './App.css';

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
