import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { resetPassword as resetPasswordApi } from '../../features/auth/api/auth.api';
import Swal from 'sweetalert2';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError('Enlace inválido o incompleto.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await resetPasswordApi(token, password);
            Swal.fire({
                title: '¡Contraseña actualizada!',
                text: 'Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión.',
                icon: 'success',
                confirmButtonColor: '#14b8a6'
            }).then(() => {
                navigate('/login');
            });
        } catch (err) {
            setError(err.message || 'Error al restablecer la contraseña.');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100 dark:border-slate-800">
                    <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Enlace no válido</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">El enlace de recuperación es incorrecto o le falta el token de verificación.</p>
                    <Link to="/login" className="inline-block bg-pink-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-pink-700 transition-colors shadow-md">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
            <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl shadow-xl max-w-md w-full border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl border border-pink-100 dark:border-pink-800">
                        🔑
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Nueva Contraseña
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-light">
                        Crea una contraseña segura para restablecer el acceso a tu cuenta.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium border border-red-100 dark:border-red-800/50 mb-6 flex items-center gap-3">
                        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nueva Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
                            className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Confirmar Contraseña</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repite tu nueva contraseña"
                            className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            'Restablecer Contraseña'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-800 pt-6">
                    <Link to="/login" className="text-sm text-slate-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-400 font-medium transition-colors">
                        ← Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
