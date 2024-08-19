import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";
import DownloadSection from "./components/DownloadSection";
import SignUpPrompt from "./components/SignUpPrompt";
import Footer from "./components/Footer";
import RegisterPage from "./Pages/RegisterPage"; 
import "./App.css";
import HomePage from "./Pages/HomePage";


function LoginPage() {
  return (
    <div className="app">
      <Header />
      <Form />
      <DownloadSection />
      <SignUpPrompt />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;



