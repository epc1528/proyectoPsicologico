import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { ThemeContext } from '../../app/providers/ThemeProvider';
import logoClick from '../../assets/logo-click.jpeg';

export default function NavBar() {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold text-indigo-950 dark:text-white flex items-center gap-2 z-50">
                    <img src={logoClick} alt="Logo" className="w-15 h-15 object-contain" />
                    <span style={{ fontFamily: "'Playfair Display', serif" }}>Dra. Milagros Bolaño Romero</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-slate-600 dark:text-slate-300 font-medium hover:text-rose-600 dark:hover:text-pink-400 transition-colors">Inicio</Link>
                    <Link to="/cartillas" className="text-slate-600 dark:text-slate-300 font-medium hover:text-rose-600 dark:hover:text-pink-400 transition-colors">Catálogo</Link>

                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-5">
                            <Link to="/mis-cartillas" className="text-slate-600 font-medium hover:text-rose-600 transition-colors">Mis Bitácoras</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-pink-600 font-bold hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 bg-pink-50 dark:bg-pink-900/30 px-4 py-2 rounded-full transition-colors">Panel Doctora</Link>
                            )}
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Hola, <b className="text-rose-950 dark:text-white">{user.nombre.split(' ')[0]}</b></span>
                            <button onClick={logout} className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-slate-800 dark:hover:text-white transition-colors">Salir</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="bg-pink-600 dark:bg-pink-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-pink-700 dark:hover:bg-pink-600 transition-all shadow-md hover:shadow-lg">Comenzar</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4 z-50">
                    <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400" aria-label="Toggle Dark Mode">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-slate-300 focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl py-4 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-4">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-pink-400">Inicio</Link>
                    <Link to="/cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-pink-400">Catálogo</Link>
                    {user ? (
                        <>
                            <Link to="/mis-cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-rose-600">Mis Bitácoras</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-pink-600 dark:text-pink-400">Panel Doctora</Link>
                            )}
                            <hr className="border-slate-100 dark:border-slate-800" />
                            <div className="flex justify-between items-center">
                                <span className="text-slate-700 dark:text-slate-300">Hola, <b>{user.nombre}</b></span>
                                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-500 font-medium">Cerrar Sesión</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <hr className="border-slate-100 dark:border-slate-800" />
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-pink-600 dark:bg-pink-500 text-white text-center py-3 rounded-xl font-bold mt-2">Comenzar Ahora</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
