import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { getMisCompras } from '../../features/compras/api/compras.api';

export default function MisCartillas() {
    const [compras, setCompras] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            setTimeout(() => navigate('/login'), 100);
            return;
        }
        getMisCompras()
            .then((data) => {
                setCompras(data);
                setLoading(false);
            })
            .catch(console.error);
    }, [user, navigate]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Mis Bitácoras</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">Continúa con tu progreso en las bitácoras que has adquirido.</p>
                </div>

                {compras.length === 0 ? (
                    <div className="text-center bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto">
                        <div className="text-5xl mb-4">📚</div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Aún no tienes bitácoras</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">Visita nuestro catálogo para encontrar la herramienta ideal para ti.</p>
                        <Link to="/cartillas" className="bg-pink-600 dark:bg-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-pink-700 dark:hover:bg-pink-700 transition-colors shadow-md inline-block">
                            Ver Catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {compras.map((cartilla) => (
                            <div key={cartilla.id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-pink-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-2 h-full bg-pink-400 dark:bg-pink-600"></div>
                                <div className="w-full h-40 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden shadow-sm p-2 border border-slate-200 dark:border-slate-700/50">
                                    <img
                                        src={cartilla.id === 1 ? '/covers/adulto.jpeg' : cartilla.id === 2 ? '/covers/adolescentes.jpeg' : '/covers/infancia.jpeg'}
                                        alt={`Portada ${cartilla.titulo}`}
                                        className="w-full h-full object-cover rounded-xl shadow-sm transition-transform group-hover:scale-105 duration-700"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{cartilla.titulo}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow font-light leading-relaxed">{cartilla.descripcion}</p>
                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <Link to={`/cartilla/${cartilla.id}`} className="w-full text-center block bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-bold px-5 py-3 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-800/50 transition-colors">
                                        Continuar Taller →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
