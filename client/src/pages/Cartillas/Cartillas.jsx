import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { getCartillas } from '../../features/cartillas/api/cartillas.api';
import { getMisCompras, comprarCartilla } from '../../features/compras/api/compras.api';
import Swal from 'sweetalert2';

const CARTILLAS_DEFAULT = [
    {
        id: 1,
        titulo: 'Bitácora Adultos',
        descripcion: 'Ejercicios creativos que conectan para el amor propio, sanar heridas, establecer limites sanos y reducir el estres propio de la edad.',
        precio: 12000,
        imagen_url: '/covers/adulto.jpeg'
    },
    {
        id: 2,
        titulo: 'Bitácora Adolescentes',
        descripcion: 'Herramientas para manejar la ansiedad, fortalecer la identidad, mejorar las relaciones y construir autoconfianza.',
        precio: 12000,
        imagen_url: '/covers/adolescente.jpeg'
    },
    {
        id: 3,
        titulo: 'Bitácora Infantil',
        descripcion: 'Actividades lúdicas para desarrollar inteligencia emocional, autoestima, empatía y habilidades para expresar sentimientos.',
        precio: 12000,
        imagen_url: '/covers/infancia.jpeg'
    }
];

export default function Cartillas() {
    const [cartillas, setCartillas] = useState(CARTILLAS_DEFAULT);
    const [compradas, setCompradas] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getCartillas()
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setCartillas(data);
                }
            })
            .catch((err) => {
                console.error("Error obteniendo cartillas del servidor:", err);
            });

        if (user) {
            getMisCompras()
                .then((data) => {
                    if (Array.isArray(data)) setCompradas(data.map((c) => c.id));
                })
                .catch(console.error);
        }
    }, [user]);

    const handleIngresar = async (cartilla) => {
        // Solo la bitácora id: 2 (Adolescentes) está lista y publicada oficialmente
        if (cartilla.id !== 2) {
            Swal.fire({
                title: '<strong>Bitácora en Edición</strong>',
                icon: 'info',
                html: `
                    <div style="font-size: 1rem; color: #475569; line-height: 1.6; text-align: left;">
                        <p style="margin-bottom: 12px;">La <strong>${cartilla.titulo}</strong> se encuentra en proceso de actualización con su nueva versión oficial.</p>
                        <div style="background: #fff1f2; border: 1px solid #fecdd3; padding: 12px; border-radius: 12px; color: #be123c; font-size: 0.9rem;">
                            ✨ La <strong>Bitácora de Adolescentes</strong> ya está 100% terminada, lista para usar y descargar.
                        </div>
                    </div>
                `,
                confirmButtonColor: '#e11d48',
                confirmButtonText: 'Ver Bitácora Adolescentes'
            }).then((res) => {
                if (res.isConfirmed) {
                    const adol = cartillas.find(c => c.id === 2);
                    if (adol) handleIngresar(adol);
                }
            });
            return;
        }

        if (!user) {
            navigate('/login');
            return;
        }
        if (!compradas.includes(cartilla.id) && user.role !== 'admin') {
            try {
                await comprarCartilla(cartilla.id);
                setCompradas((prev) => [...prev, cartilla.id]);
            } catch {
                // Si falla o ya estaba comprada
            }
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
                        {cartillas.map((cartilla, index) => {
                            const isAdolescente = cartilla.id === 2;
                            return (
                                <div
                                    key={cartilla.id}
                                    className={`bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border transition-all duration-300 flex flex-col group relative overflow-hidden ${
                                        isAdolescente
                                            ? 'border-emerald-300 dark:border-emerald-700/60 ring-2 ring-emerald-400/30 hover:-translate-y-2'
                                            : 'border-slate-200 dark:border-slate-800 opacity-90'
                                    }`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        {isAdolescente ? (
                                            <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-sm">
                                                <span>✨</span> OFICIAL DISPONIBLE
                                            </span>
                                        ) : (
                                            <span className="px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wide flex items-center gap-1.5">
                                                <span>🔒</span> PRÓXIMAMENTE (EN EDICIÓN)
                                            </span>
                                        )}
                                    </div>

                                    <div className="w-full h-56 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-2">
                                        <img
                                            src={cartilla.id === 1 ? '/covers/adulto.jpeg' : cartilla.id === 2 ? '/covers/adolescente.jpeg' : '/covers/infancia.jpeg'}
                                            alt={`Portada ${cartilla.titulo}`}
                                            className="w-full h-full object-cover rounded-xl shadow-md transition-transform group-hover:scale-105 duration-700"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{cartilla.titulo}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow font-light leading-relaxed line-clamp-3">{cartilla.descripcion}</p>
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                                        <div>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-semibold">Inversión</p>
                                            <div className="text-rose-600 dark:text-pink-400 font-extrabold text-2xl">
                                                ${(cartilla.precio === 120000 ? 12000 : cartilla.precio).toLocaleString('es-CO')} <span className="text-sm font-medium opacity-70">COP</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleIngresar(cartilla)}
                                            className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                                                isAdolescente
                                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg'
                                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            {isAdolescente ? 'Ingresar →' : 'En Edición 🔒'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
