import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-pink-950 dark:bg-slate-950 text-slate-300 py-16 mt-auto border-t border-rose-900/50 dark:border-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12 border-b border-rose-900 dark:border-slate-800 pb-12">
                    <div className="md:col-span-1 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-pink-500/20">P</span>
                            <span className="text-2xl font-bold text-white tracking-tight">PsicoBitácoras</span>
                        </div>
                        <p className="text-rose-200/70 dark:text-slate-500 font-light max-w-sm leading-relaxed">
                            Transformando el acceso a la salud mental mediante herramientas digitales interactivas, seguras y profesionales.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-pink-900 dark:bg-slate-900 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors duration-300">
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Plataforma</h4>
                        <ul className="space-y-4">
                            <li><Link to="/cartillas" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 transition-colors">Catálogo de Bitácoras</Link></li>
                            <li><Link to="/login" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 transition-colors">Inicia Sesión</Link></li>
                            <li><Link to="/login" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 transition-colors">Regístrate</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal & Soporte</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 transition-colors">Centro de Ayuda</a></li>
                            <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-rose-300/50 dark:text-slate-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} PsicoBitácoras. Diseñado para tu bienestar mental.</p>
                    <p className="mt-4 md:mt-0 flex items-center gap-2">Hecho con <span className="text-pink-500">❤️</span> por expertos clínicos.</p>
                </div>
            </div>
        </footer>
    );
}
