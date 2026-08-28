import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { getCartillas } from '../../features/cartillas/api/cartillas.api';
import { getMisCompras } from '../../features/compras/api/compras.api';

export default function Cartillas() {
    const [cartillas, setCartillas] = useState([]);
    const [compradas, setCompradas] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getCartillas()
            .then(setCartillas)
            .catch(console.error);

        if (user) {
            getMisCompras()
                .then((data) => {
                    if (Array.isArray(data)) setCompradas(data.map((c) => c.id));
                })
                .catch(console.error);
        }
    }, [user]);

    const handleIngresar = (cartilla) => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate(`/cartilla/${cartilla.id}`);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800/50 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6 shadow-sm">
                        Catálogo Oficial
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestras Bitácoras Emocionales</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Herramientas diseñadas clínicamente para acompañarte en tu proceso.
                    </p>
                </div>

                {cartillas.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 dark:text-slate-400 flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        Cargando bitácoras...
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cartillas.map((cartilla, index) => (
                            <div
                                key={cartilla.id}
                                className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                                <div className="w-full h-56 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-2">
                                    <img
                                        src={cartilla.id === 1 ? '/covers/adulto.jpeg' : cartilla.id === 2 ? '/covers/adolescente.jpeg' : '/covers/infancia.jpeg'}
                                        alt={`Portada ${cartilla.titulo}`}
                                        className="w-full h-full object-cover rounded-xl shadow-md transition-transform group-hover:scale-105 duration-700"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{cartilla.titulo}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow font-light leading-relaxed line-clamp-3">{cartilla.descripcion}</p>
                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                                    <div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-semibold">Inversión</p>
                                        <div className="text-rose-600 dark:text-pink-400 font-extrabold text-2xl">
                                            ${(cartilla.precio === 120000 ? 12000 : cartilla.precio).toLocaleString('es-CO')} <span className="text-sm font-medium opacity-70">COP</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleIngresar(cartilla)}
                                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-pink-600 dark:hover:bg-pink-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                                    >
                                        Ingresar →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
