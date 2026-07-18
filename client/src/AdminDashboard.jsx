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
          text: 'Cartilla creada con éxito (ID: ' + data.id + ')',
          icon: 'success',
          confirmButtonColor: '#14b8a6'
        });
        setShowForm(false);
        setFormData({ titulo: '', descripcion: '', precio: 12000, imagen_url: '' });
      }).catch(console.error);
  };

  const handleDeleteUsuario = (id, nombre) => {
    Swal.fire({
      title: '¿Eliminar a ' + nombre + '?',
      text: "Se borrarán todos sus datos y respuestas permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Sí, eliminar',
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
            Swal.fire('Eliminado', 'El paciente ha sido dado de baja de la base de datos.', 'success');
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Cargando panel de administración...</p>
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
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header del Panel */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-indigo-950">Panel de Control Clínico</h2>
            <p className="text-slate-500 mt-1 font-light">Monitorea el progreso de tus pacientes de forma segura.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 px-6 py-3 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">D</div>
            <div>
              <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Sesión Activa</p>
              <p className="font-bold text-sm">{getTituloDoctor(user.nombre)} {user.nombre.replace('Doctora (Admin)', '').replace('Doctor (Admin)', '').trim() || 'Profesional'}</p>
            </div>
          </div>
        </div>

        {/* Sección de Crear Cartilla */}
        <div className="mb-10">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md"
          >
            {showForm ? 'Cancelar' : '+ Crear Nueva Cartilla'}
          </button>
          
          {showForm && (
            <div className="mt-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4">
              <h3 className="text-xl font-bold text-indigo-950 mb-4">Detalles de la nueva cartilla</h3>
              <form onSubmit={handleCreateCartilla} className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                  <input type="text" required className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                  <textarea required className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Precio (COP)</label>
                    <input type="number" required className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">URL Imagen (Opcional)</label>
                    <input type="text" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" value={formData.imagen_url} onChange={e => setFormData({...formData, imagen_url: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="bg-teal-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-md">
                  Guardar Cartilla
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Tabla de Usuarios */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden sticky top-24">
              <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100">
                <h3 className="font-bold text-xl text-indigo-950 flex items-center gap-2">
                  <span className="text-teal-500">👥</span> Pacientes
                </h3>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto">
                <div className="space-y-2">
                  {usuarios.filter(u => u.role !== 'admin').map(u => (
                    <div key={u.id} className="flex flex-col p-4 rounded-2xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100 gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{u.nombre}</p>
                          <p className="text-sm text-slate-500 font-light">{u.correo}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xs font-bold" title="Respuestas Guardadas">
                            {respuestas.filter(r => r.userId === u.id).length}
                          </div>
                          <button onClick={() => handleDeleteUsuario(u.id, u.nombre)} className="text-slate-300 hover:text-red-500 transition-colors p-1" title="Dar de baja">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                        {u.telefono && <span>📞 {u.telefono}</span>}
                        {u.fecha_nacimiento && <span>🎂 {new Date(u.fecha_nacimiento).toLocaleDateString()}</span>}
                        {u.motivo_consulta && <span className="text-indigo-500 font-medium">📋 {u.motivo_consulta}</span>}
                      </div>
                    </div>
                  ))}
                  {usuarios.filter(u => u.role !== 'admin').length === 0 && (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📭</div>
                      <p className="text-slate-500 text-sm">No hay pacientes registrados aún.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Respuestas */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-xl text-indigo-950 flex items-center gap-2">
                  <span className="text-teal-500">📝</span> Actividad Reciente
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                  {respuestas.length} Registros
                </span>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {respuestas.slice().reverse().map(r => {
                    const paciente = usuarios.find(u => u.id === r.userId);
                    return (
                      <div key={r.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow">
                        <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-slate-50 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-700 font-bold border border-indigo-100">
                              {paciente ? paciente.nombre.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div>
                              <span className="font-bold text-slate-800 block">{paciente ? paciente.nombre : 'Usuario Desconocido'}</span>
                              <span className="text-xs text-slate-400 font-medium">{new Date(r.fecha).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                              Cartilla #{r.cartillaId}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                              parseInt(r.energia) >= 7 ? 'bg-teal-50 text-teal-700 border-teal-100' : 
                              parseInt(r.energia) <= 4 ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                              'bg-indigo-50 text-indigo-700 border-indigo-100'
                            }`}>
                              Energía: {r.energia}/10
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-slate-700">
                          <p className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 italic leading-relaxed text-slate-600 font-light">
                            "{r.reflexion}"
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {respuestas.length === 0 && (
                    <div className="p-16 text-center">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border border-slate-100">🍃</div>
                      <h4 className="text-xl font-bold text-indigo-950 mb-2">Todo tranquilo por aquí</h4>
                      <p className="text-slate-500 font-light max-w-sm mx-auto">Cuando tus pacientes comiencen a llenar sus cartillas, sus reflexiones aparecerán en este panel.</p>
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
