import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', precio: 12000, imagen_url: '' });

  const handleCreateCartilla = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/admin/cartillas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(data => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Programa clínico creado exitosamente (ID: ' + data.id + ')',
          icon: 'success',
          confirmButtonColor: '#059669'
        });
        setShowForm(false);
        setFormData({ titulo: '', descripcion: '', precio: 12000, imagen_url: '' });
      }).catch(console.error);
  };

  const handleDeleteUsuario = (id, nombre) => {
    Swal.fire({
      title: '¿Eliminar expediente de ' + nombre + '?',
      text: "Se borrarán todos los datos clínicos y registros de forma permanente y segura.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Sí, eliminar expediente',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/admin/usuarios/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => res.json())
          .then(() => {
            setUsuarios(usuarios.filter(u => u.id !== id));
            setRespuestas(respuestas.filter(r => r.userId !== id));
            Swal.fire('Expediente Eliminado', 'El paciente ha sido dado de baja del sistema clínico.', 'success');
          }).catch(console.error);
      }
    });
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const token = localStorage.getItem('token');
    
    Promise.all([
      fetch('http://localhost:5000/api/admin/usuarios', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json()),
      fetch('http://localhost:5000/api/admin/respuestas', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json())
    ])
    .then(([usuariosData, respuestasData]) => {
      setUsuarios(usuariosData);
      setRespuestas(respuestasData);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [user, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-stone-500 dark:text-slate-400 uppercase tracking-widest text-xs font-semibold">Cargando Consultorio...</p>
      </div>
    </div>
  );

  const getTituloDoctor = (nombre) => {
    if (!nombre) return 'Dr(a).';
    const primerNombre = nombre.split(' ')[0].toLowerCase();
    if (primerNombre.endsWith('a') || nombre.toLowerCase().includes('doctora')) {
      return 'Dra.';
    }
    return 'Dr.';
  };

  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen py-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header del Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-100 dark:border-slate-700 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in-up">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              Portal Especialista
            </div>
            <h2 className="text-4xl font-serif text-slate-900 dark:text-white">Consultorio Clínico</h2>
            <p className="text-stone-500 dark:text-slate-400 mt-2 font-light">Gestión confidencial de pacientes y monitoreo de procesos terapéuticos.</p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100 px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-emerald-800 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center font-serif text-emerald-800 dark:text-white text-lg shadow-sm">
              {getTituloDoctor(user.nombre).charAt(0)}
            </div>
            <div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-widest mb-0.5">Sesión Activa</p>
              <p className="font-serif text-lg font-medium">{getTituloDoctor(user.nombre)} {user.nombre.replace('Doctora (Admin)', '').replace('Doctor (Admin)', '').trim() || 'Especialista'}</p>
            </div>
          </div>
        </div>

        {/* Sección de Crear Cartilla */}
        <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-slate-900 dark:bg-emerald-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-colors shadow-md tracking-wide flex items-center gap-2"
          >
            {showForm ? (
              <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancelar Creación</>
            ) : (
              <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg> Nuevo Programa Clínico</>
            )}
          </button>
          
          {showForm && (
            <div className="mt-6 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-4">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-8 border-b border-stone-100 dark:border-slate-700 pb-4">Detalles del Nuevo Material</h3>
              <form onSubmit={handleCreateCartilla} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Título del Programa</label>
                  <input type="text" required className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-stone-50/50 dark:bg-slate-900 dark:text-white font-light transition-all" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} placeholder="Ej: Gestión de Ansiedad" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Descripción Terapéutica</label>
                  <textarea required className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-stone-50/50 dark:bg-slate-900 dark:text-white font-light transition-all" rows="4" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} placeholder="Objetivos y metodología del programa..."></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Honorarios (COP)</label>
                    <input type="number" required className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-stone-50/50 dark:bg-slate-900 dark:text-white font-light transition-all" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">URL Imagen (Opcional)</label>
                    <input type="text" className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-stone-50/50 dark:bg-slate-900 dark:text-white font-light transition-all" value={formData.imagen_url} onChange={e => setFormData({...formData, imagen_url: e.target.value})} placeholder="https://..." />
                  </div>
                </div>
                <button type="submit" className="mt-4 bg-emerald-800 text-white px-10 py-4 rounded-xl font-medium hover:bg-emerald-900 transition-colors shadow-md tracking-wide">
                  Publicar Material
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {/* Tabla de Usuarios */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-100 dark:border-slate-700 overflow-hidden sticky top-32">
              <div className="bg-stone-50/80 dark:bg-slate-800/80 px-8 py-6 border-b border-stone-100 dark:border-slate-700">
                <h3 className="font-serif text-xl text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  Directorio de Pacientes
                </h3>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                  {usuarios.filter(u => u.role !== 'admin').map(u => (
                    <div key={u.id} className="flex flex-col p-5 rounded-2xl hover:bg-stone-50 dark:hover:bg-slate-700/50 transition-colors group border border-transparent hover:border-stone-100 dark:hover:border-slate-600 gap-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-serif font-semibold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{u.nombre}</p>
                          <p className="text-xs text-stone-500 dark:text-slate-400 font-light mt-1">{u.correo}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-100 dark:border-emerald-800" title="Registros Clínicos">
                            {respuestas.filter(r => r.userId === u.id).length}
                          </div>
                          <button onClick={() => handleDeleteUsuario(u.id, u.nombre)} className="text-stone-300 dark:text-slate-600 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1" title="Cerrar Expediente">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-2 uppercase tracking-wide">
                        {u.telefono && <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> {u.telefono}</span>}
                        {u.fecha_nacimiento && <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {new Date(u.fecha_nacimiento).toLocaleDateString()}</span>}
                        {u.motivo_consulta && <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> {u.motivo_consulta}</span>}
                      </div>
                    </div>
                  ))}
                  {usuarios.filter(u => u.role !== 'admin').length === 0 && (
                    <div className="p-10 text-center">
                      <div className="w-16 h-16 bg-stone-50 dark:bg-slate-700 border border-stone-100 dark:border-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300 dark:text-slate-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                      </div>
                      <p className="text-stone-500 dark:text-slate-400 text-sm font-light">Sin expedientes activos.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Respuestas */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-stone-50/80 dark:bg-slate-800/80 px-8 py-6 border-b border-stone-100 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-serif text-xl text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-800 dark:text-amber-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </div>
                  Bitácora de Sesiones
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
                  {respuestas.length} Registros
                </span>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {respuestas.slice().reverse().map(r => {
                    const paciente = usuarios.find(u => u.id === r.userId);
                    return (
                      <div key={r.id} className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-stone-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap justify-between items-center mb-5 pb-5 border-b border-stone-50 dark:border-slate-800 gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-700 flex items-center justify-center text-white font-serif text-lg border border-slate-700 shadow-sm">
                              {paciente ? paciente.nombre.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div>
                              <span className="font-serif font-semibold text-slate-900 dark:text-white block text-lg">{paciente ? paciente.nombre : 'Usuario Desconocido'}</span>
                              <span className="text-xs text-stone-500 dark:text-slate-400 font-light flex items-center gap-1 mt-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {new Date(r.fecha).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="bg-stone-50 dark:bg-slate-800 text-stone-600 dark:text-slate-300 border border-stone-200 dark:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase">
                              Programa #{r.cartillaId}
                            </span>
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase border ${
                              parseInt(r.energia) >= 7 ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50' : 
                              parseInt(r.energia) <= 4 ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/50' : 
                              'bg-stone-50 text-stone-700 border-stone-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600'
                            }`}>
                              Energía: {r.energia}/10
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="bg-[#FDFBF7] dark:bg-slate-800/50 p-6 rounded-xl border border-[#F2EFE9] dark:border-slate-700/50 italic leading-relaxed text-slate-700 dark:text-slate-300 font-serif text-lg">
                            "{r.reflexion}"
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {respuestas.length === 0 && (
                    <div className="p-16 text-center">
                      <div className="w-24 h-24 bg-stone-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-100 dark:border-slate-600">
                        <svg className="w-10 h-10 text-stone-300 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                      </div>
                      <h4 className="text-xl font-serif text-slate-900 dark:text-white mb-2">Bitácora Vacía</h4>
                      <p className="text-stone-500 dark:text-slate-400 font-light max-w-sm mx-auto">Las anotaciones y registros de tus pacientes aparecerán documentadas aquí.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
