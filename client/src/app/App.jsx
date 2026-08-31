import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Cartillas from '../pages/Cartillas/Cartillas';
import MisCartillas from '../pages/MisCartillas/MisCartillas';
import Auth from '../pages/Auth/Auth';
import ResetPassword from '../pages/Auth/ResetPassword';
import PoliticaPrivacidad from '../pages/Legal/PoliticaPrivacidad';
import TerminosCondiciones from '../pages/Legal/TerminosCondiciones';
import InteractiveWorkbook from '../pages/Taller/InteractiveWorkbook';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import CitaModal from '../components/CitaModal/CitaModal';

export default function App() {
    const [isGlobalCitaModalOpen, setIsGlobalCitaModalOpen] = useState(false);

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <NavBar onOpenCitaModal={() => setIsGlobalCitaModalOpen(true)} />
                <main className="flex-grow flex flex-col">
                    <Routes>
                        <Route path="/" element={<Home onOpenCitaModal={() => setIsGlobalCitaModalOpen(true)} />} />
                        <Route path="/login" element={<Auth />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
                        <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
                        <Route path="/cartillas" element={<Cartillas />} />
                        <Route path="/mis-cartillas" element={<MisCartillas />} />
                        <Route path="/cartilla/:id" element={<InteractiveWorkbook />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>
                <Footer />
                <CitaModal
                    isOpen={isGlobalCitaModalOpen}
                    onClose={() => setIsGlobalCitaModalOpen(false)}
                />
            </div>
        </Router>
    );
}
