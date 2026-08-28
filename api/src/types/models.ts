export interface IUsuario {
    id: number;
    nombre: string;
    correo: string;
    password: string;
    telefono: string;
    fecha_nacimiento: string;
    motivo_consulta: string;
    role: 'admin' | 'user';
    created_at?: Date;
}

export interface IUsuarioPublico {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    fecha_nacimiento: string;
    motivo_consulta: string;
    role: 'admin' | 'user';
}

export interface ICartilla {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen_url: string;
    created_at?: Date;
}

export interface ICartillaInput {
    titulo: string;
    descripcion: string;
    precio: number;
    imagen_url: string;
}

export interface ICompra {
    id: number;
    usuario_id: number;
    cartilla_id: number;
    fecha?: Date;
}

export interface IRespuesta {
    id: number;
    usuario_id: number;
    taller_id: number;
    respuesta: string;
    energia: number;
    fecha?: Date;
}

export interface IRespuestaAdmin {
    id: number;
    userId: number;
    cartillaId: number;
    reflexion: string;
    energia: number;
    fecha?: Date;
}

export interface ITaller {
    id: number;
    cartilla_id: number;
    titulo: string;
    descripcion: string;
    orden: number;
}

export interface IAuthPayload {
    id: number;
    correo: string;
    role: 'admin' | 'user';
}

export interface IRegisterInput {
    nombre: string;
    correo: string;
    password: string;
    telefono: string;
    fecha_nacimiento: string;
    motivo_consulta?: string;
    codigoAdmin?: string;
}

export interface IAuthResult {
    token: string;
    user: {
        id: number;
        nombre: string;
        correo: string;
        role: 'admin' | 'user';
    };
}
