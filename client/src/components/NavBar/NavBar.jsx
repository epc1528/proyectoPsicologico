import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { ThemeContext } from '../../app/providers/ThemeProvider';
import logoClick from '../../assets/logo-click.jpeg';

export default function NavBar({ onOpenCitaModal }) {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center gap-4">
                
                {/* Logo & Marca */}
                <Link to="/" className="flex items-center gap-3 shrink-0 group z-50">
                    <img
                        src={logoClick}
                        alt="Logo PsicoCartillas"
                        className="w-11 h-11 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                        className="text-base sm:text-lg lg:text-xl font-extrabold text-indigo-950 dark:text-white tracking-tight group-hover:text-rose-600 dark:group-hover:text-pink-400 transition-colors hidden sm:inline-block"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Dale un click a tus emociones
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-5 lg:gap-6">
                    <Link
                        to="/"
                        className="text-slate-600 dark:text-slate-300 font-semibold text-sm hover:text-rose-600 dark:hover:text-pink-400 transition-colors"
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/cartillas"
                        className="text-slate-600 dark:text-slate-300 font-semibold text-sm hover:text-rose-600 dark:hover:text-pink-400 transition-colors"
                    >
                        Catálogo
                    </Link>

                    {onOpenCitaModal && (
                        <button
                            onClick={onOpenCitaModal}
                            className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 text-rose-700 dark:text-pink-300 border border-rose-200/80 dark:border-rose-800/80 px-4 py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                            <span>📅</span> Solicitar Cita
                        </button>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors focus:outline-none"
                        aria-label="Toggle Dark Mode"
                        title="Cambiar tema"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-4">
                            <Link
                                to="/mis-cartillas"
                                className="text-slate-600 dark:text-slate-300 font-semibold text-sm hover:text-rose-600 dark:hover:text-pink-400 transition-colors"
                            >
                                Mis Bitácoras
                            </Link>

                            {user.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="text-pink-600 dark:text-pink-400 font-extrabold text-xs bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 px-3.5 py-1.5 rounded-full hover:bg-pink-100 transition-colors"
                                >
                                    Panel Doctora
                                </Link>
                            )}

                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Hola, <b className="text-rose-950 dark:text-white">{user.nombre.split(' ')[0]}</b>
                            </span>

                            <button
                                onClick={logout}
                                className="text-xs font-bold text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-5 py-2 rounded-full font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md"
                            >
                                Comenzar
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile & Tablet Navigation controls */}
                <div className="lg:hidden flex items-center gap-3 z-50">
                    {onOpenCitaModal && (
                        <button
                            onClick={onOpenCitaModal}
                            className="bg-rose-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm"
                        >
                            📅 Cita
                        </button>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="p-1.5 rounded-full text-slate-500 dark:text-slate-400"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-slate-600 dark:text-slate-300 focus:outline-none p-1"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-2xl py-5 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-4">
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-600"
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/cartillas"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-600"
                    >
                        Catálogo
                    </Link>

                    {onOpenCitaModal && (
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                onOpenCitaModal();
                            }}
                            className="text-left text-base font-bold text-rose-600 dark:text-pink-400"
                        >
                            📅 Solicitar Cita Médica
                        </button>
                    )}

                    {user ? (
                        <>
                            <Link
                                to="/mis-cartillas"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-600"
                            >
                                Mis Bitácoras
                            </Link>

                            {user.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-extrabold text-pink-600 dark:text-pink-400"
                                >
                                    Panel Doctora
                                </Link>
                            )}

                            <hr className="border-slate-100 dark:border-slate-800 my-2" />

                            <div className="flex justify-between items-center pt-1">
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                    Hola, <b>{user.nombre}</b>
                                </span>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-xs font-bold text-rose-600 hover:underline"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <hr className="border-slate-100 dark:border-slate-800 my-2" />
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-rose-600 text-white text-center py-3 rounded-xl font-bold mt-2 shadow-md"
                            >
                                Comenzar Ahora
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
