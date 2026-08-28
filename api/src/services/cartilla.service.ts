import { CartillaRepository } from '../repositories/cartilla.repository';
import { ICartilla } from '../types/models';

export class CartillaService {
    constructor(private readonly cartillaRepo: CartillaRepository) { }

    async getAll(): Promise<ICartilla[]> {
        return this.cartillaRepo.findAll();
    }

    async getById(id: number): Promise<ICartilla> {
        const cartilla = await this.cartillaRepo.findById(id);
        if (!cartilla) {
            const err = new Error('Cartilla no encontrada');
            (err as any).statusCode = 404;
            throw err;
        }
        return cartilla;
    }
}
