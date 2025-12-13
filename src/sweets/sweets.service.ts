import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sweet } from './sweet.entity';

@Injectable()
export class SweetsService {
  constructor(
    @InjectRepository(Sweet)
    private sweetRepo: Repository<Sweet>,
  ) {}

  // ADD SWEET
  createSweet(data: Partial<Sweet>) {
    const sweet = this.sweetRepo.create(data);
    return this.sweetRepo.save(sweet);
  }

  // GET ALL SWEETS
  getAllSweets() {
    return this.sweetRepo.find();
  }

  // PURCHASE SWEET
  async purchaseSweet(id: number, amount: number = 1) {
    const sweet = await this.sweetRepo.findOne({ where: { id } });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    if (sweet.quantity < amount) {
      throw new BadRequestException('Not enough stock');
    }

    sweet.quantity -= amount;
    return this.sweetRepo.save(sweet);
  }

  // RESTOCK SWEET (ADMIN)
  async restockSweet(id: number, amount: number) {
    const sweet = await this.sweetRepo.findOne({ where: { id } });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    sweet.quantity += amount;
    return this.sweetRepo.save(sweet);
  }

  // SEARCH SWEETS
  searchSweets(query: any) {
    const { name, category, minPrice, maxPrice } = query;

    const qb = this.sweetRepo.createQueryBuilder('sweet');

    if (name) {
      qb.andWhere('sweet.name LIKE :name', { name: `%${name}%` });
    }

    if (category) {
      qb.andWhere('sweet.category = :category', { category });
    }

    if (minPrice) {
      qb.andWhere('sweet.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      qb.andWhere('sweet.price <= :maxPrice', { maxPrice });
    }

    return qb.getMany();
  }

  // DELETE SWEET (ADMIN)
  async deleteSweet(id: number) {
    const result = await this.sweetRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Sweet not found');
    }

    return { message: 'Sweet deleted successfully' };
  }
}
