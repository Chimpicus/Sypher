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
      <SideNav />
      <div className="w-full h-screen bg-zinc-800 flex flex-col justify-center items-center pl-64">
        <Routes>
          <Route path="/" element={<EncryptFile />} />
          <Route path="/encrypt" element={<EncryptFile />} />
          <Route path="/decrypt" element={<DecryptFile />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
