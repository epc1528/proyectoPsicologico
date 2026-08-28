import { UsuarioRepository } from '../repositories/usuario.repository';
import { CartillaRepository } from '../repositories/cartilla.repository';
import { RespuestaRepository } from '../repositories/respuesta.repository';
import { CompraRepository } from '../repositories/compra.repository';
import { TallerRepository } from '../repositories/taller.repository';
import { IUsuarioPublico, ICartilla, IRespuestaAdmin, ICartillaInput, ITaller } from '../types/models';

export class AdminService {
    constructor(
        private readonly userRepo: UsuarioRepository,
        private readonly cartillaRepo: CartillaRepository,
        private readonly respuestaRepo: RespuestaRepository,
        private readonly compraRepo: CompraRepository,
        private readonly tallerRepo: TallerRepository
    ) { }

    async getUsuarios(): Promise<IUsuarioPublico[]> {
        return this.userRepo.findAll();
    }

    async deleteUsuario(id: number): Promise<void> {
        await this.userRepo.deleteById(id);
    }

    /**
     * Obtener todas las respuestas formateadas para el panel admin.
     * Intenta parsear el JSON de la respuesta para mostrar texto legible.
     */
    async getRespuestas(): Promise<IRespuestaAdmin[]> {
        const rows = await this.respuestaRepo.findAll();
        return rows.map((r) => {
            let reflexion = (r as any).respuesta ?? '';
            try {
                const parsed: Record<string, string> = JSON.parse((r as any).respuesta);
                reflexion = Object.values(parsed)
                    .filter((val) => String(val).trim() !== '')
                    .join(' | ');
            } catch {
                // No es JSON, se usa como texto plano
            }
            return { ...r, reflexion: reflexion || 'Sin respuestas' };
        });
    }

    async createCartilla(data: ICartillaInput): Promise<number> {
        return this.cartillaRepo.create(data);
    }

    async deleteCartilla(id: number): Promise<void> {
        await this.cartillaRepo.deleteById(id);
    }

    /**
     * Obtener talleres de una cartilla verificando que el usuario tenga acceso.
     */
    async getTalleresByCartilla(cartillaId: number, usuarioId: number, userRole: string): Promise<ITaller[]> {
        if (userRole !== 'admin') {
            const tieneAcceso = await this.compraRepo.existsByUserAndCartilla(usuarioId, cartillaId);
            if (!tieneAcceso) {
                const err = new Error('No tienes acceso a esta cartilla. Debes adquirirla primero.');
                (err as any).statusCode = 403;
                throw err;
            }
        }
        return this.tallerRepo.findByCartilla(cartillaId);
    }
}
