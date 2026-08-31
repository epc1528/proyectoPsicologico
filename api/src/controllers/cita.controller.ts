import { Request, Response } from 'express';
import { CitaService } from '../services/cita.service';

export class CitaController {
    constructor(private readonly citaService: CitaService) { }

    solicitarCita = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarioId = req.userId ?? null;
            const citaId = await this.citaService.solicitarCita(usuarioId, req.body);
            res.status(201).json({ message: 'Solicitud de cita enviada con éxito', citaId });
        } catch (err: any) {
            console.error(err);
            res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Error interno del servidor' });
        }
    };

    getCitasAdmin = async (_req: Request, res: Response): Promise<void> => {
        try {
            const citas = await this.citaService.getTodasLasCitas();
            res.json(citas);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error al consultar citas' });
        }
    };

    updateEstadoCita = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { estado } = req.body as { estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' };
            await this.citaService.cambiarEstadoCita(id, estado);
            res.json({ message: 'Estado de la cita actualizado' });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar estado de la cita' });
        }
    };

    deleteCita = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            await this.citaService.eliminarCita(id);
            res.json({ message: 'Cita eliminada correctamente' });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar cita' });
        }
    };

    enviarCorreoCliente = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const { asunto, mensaje } = req.body as { asunto: string; mensaje: string };
            if (!mensaje) {
                res.status(400).json({ error: 'El contenido del mensaje es requerido' });
                return;
            }
            await this.citaService.enviarCorreoCliente(id, asunto, mensaje);
            res.json({ message: 'Correo enviado exitosamente al paciente' });
        } catch (err: any) {
            console.error(err);
            res.status(err.statusCode ?? 500).json({ error: err.message ?? 'Error al enviar correo al paciente' });
        }
    };
}
