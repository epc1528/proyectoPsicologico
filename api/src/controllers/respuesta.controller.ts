import { Request, Response } from 'express';
import { RespuestaService } from '../services/respuesta.service';

export class RespuestaController {
    constructor(private readonly respuestaService: RespuestaService) { }

    saveRespuesta = async (req: Request, res: Response): Promise<void> => {
        const { taller_id, respuesta, energia } = req.body as { taller_id: number; respuesta: string; energia: number };
        try {
            const id = await this.respuestaService.saveRespuesta(req.userId!, taller_id, respuesta, energia);
            res.json({ message: 'Respuesta guardada', id });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    getMyRespuestas = async (req: Request, res: Response): Promise<void> => {
        try {
            const respuestas = await this.respuestaService.getMyRespuestas(req.userId!);
            res.json(respuestas);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
}
