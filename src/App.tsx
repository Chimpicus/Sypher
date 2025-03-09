import "./App.css";
import EncryptFile from "./components/Encrypt";
import DecryptFile from "./components/Decrypt";
import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { SideNav } from "./components/SideNav";

const App = () => {
  return (
    <>
      <Header />
      <div className="w-full h-screen bg-slate-900 flex flex-col justify-center items-start">
        <SideNav />
        <div className="w-full h-full flex justify-center items-center">
          <Routes>
            <Route path="/" element={<EncryptFile />} />
            <Route path="/encrypt" element={<EncryptFile />} />
            <Route path="/decrypt" element={<DecryptFile />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
