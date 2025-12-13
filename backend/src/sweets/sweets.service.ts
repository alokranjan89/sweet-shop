import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sweet } from './sweet.entity';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';

@Injectable()
export class SweetsService {
  constructor(
    @InjectRepository(Sweet)
    private readonly sweetsRepository: Repository<Sweet>,
  ) {}

  // CREATE SWEET
  create(dto: CreateSweetDto) {
    const sweet = this.sweetsRepository.create(dto);
    return this.sweetsRepository.save(sweet);
  }

  // GET ALL SWEETS
  findAll() {
    return this.sweetsRepository.find();
  }

  // SEARCH SWEETS
  search(filters: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const query = this.sweetsRepository.createQueryBuilder('sweet');

    if (filters.name) {
      query.andWhere('sweet.name LIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.category) {
      query.andWhere('sweet.category = :category', {
        category: filters.category,
      });
    }

    if (filters.minPrice) {
      query.andWhere('sweet.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }

    if (filters.maxPrice) {
      query.andWhere('sweet.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    return query.getMany();
  }

  // PURCHASE SWEET
  async purchase(id: number) {
    const sweet = await this.sweetsRepository.findOne({ where: { id } });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    if (sweet.quantity <= 0) {
      throw new NotFoundException('Sweet out of stock');
    }

    sweet.quantity -= 1;
    return this.sweetsRepository.save(sweet);
  }

  // RESTOCK SWEET (ADMIN)
  async restock(id: number) {
    const sweet = await this.sweetsRepository.findOne({ where: { id } });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    sweet.quantity += 10;
    return this.sweetsRepository.save(sweet);
  }

  // UPDATE SWEET (ADMIN) ✅ REQUIRED BY ASSESSMENT
  async update(id: number, dto: UpdateSweetDto) {
    const sweet = await this.sweetsRepository.findOne({
      where: { id },
    });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    Object.assign(sweet, dto);
    return this.sweetsRepository.save(sweet);
  }

  // DELETE SWEET (ADMIN)
  async delete(id: number) {
    const sweet = await this.sweetsRepository.findOne({ where: { id } });

    if (!sweet) {
      throw new NotFoundException('Sweet not found');
    }

    await this.sweetsRepository.delete(id);
    return { message: 'Sweet deleted successfully' };
  }
}
