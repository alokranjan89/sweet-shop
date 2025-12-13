import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSweetDto } from './dto/create-sweet.dto';

@ApiTags('Sweets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/sweets')
export class SweetsController {
  constructor(private readonly sweetsService: SweetsService) {}

  // ADD SWEET (ADMIN)
  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateSweetDto) {
    return this.sweetsService.create(dto);
  }

  // LIST SWEETS
  @Get()
  getAll() {
    return this.sweetsService.findAll();
  }

  // 🔍 SEARCH SWEETS
  @Get('search')
  search(
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.sweetsService.search({
      name,
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  // PURCHASE SWEET
  @Post(':id/purchase')
  purchase(@Param('id') id: string) {
    return this.sweetsService.purchase(Number(id));
  }

  // RESTOCK SWEET (ADMIN)
  @Post(':id/restock')
  @Roles('ADMIN')
  restock(@Param('id') id: string) {
    return this.sweetsService.restock(Number(id));
  }

  // DELETE SWEET (ADMIN)
  @Delete(':id')
  @Roles('ADMIN')
  delete(@Param('id') id: string) {
    return this.sweetsService.delete(Number(id));
  }
}
