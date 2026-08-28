import { CompraRepository } from '../repositories/compra.repository';
import { CartillaRepository } from '../repositories/cartilla.repository';
import { ICartilla } from '../types/models';

export class CompraService {
    constructor(
        private readonly compraRepo: CompraRepository,
        private readonly cartillaRepo: CartillaRepository
    ) { }

    async createCompra(usuarioId: number, cartillaId: number): Promise<void> {
        const yaCompro = await this.compraRepo.existsByUserAndCartilla(usuarioId, cartillaId);
        if (yaCompro) {
            const err = new Error('Ya has adquirido esta cartilla');
            (err as any).statusCode = 400;
            throw err;
        }
        await this.compraRepo.create(usuarioId, cartillaId);
    }

    /**
     * Devuelve todas las cartillas si es admin, o solo las compradas por el usuario.
     */
    async getMyCompras(usuarioId: number, userRole: string): Promise<ICartilla[]> {
        if (userRole === 'admin') {
            return this.cartillaRepo.findAll();
        }
        return this.compraRepo.findCartillasByUser(usuarioId);
    }
}
