import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { SweetsService } from './sweets.service';
import { CreateSweetDto } from './dto/create-sweet.dto';
import { UpdateSweetDto } from './dto/update-sweet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Sweets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/sweets')
export class SweetsController {
  constructor(private readonly sweetsService: SweetsService) {}

  // CREATE SWEET (ADMIN)
  @Post()
  @Roles('ADMIN')
  @ApiBody({ type: CreateSweetDto })
  create(@Body() body: CreateSweetDto) {
    return this.sweetsService.create(body);
  }

  // GET ALL SWEETS
  @Get()
  getAll() {
    return this.sweetsService.findAll();
  }

  // SEARCH SWEETS
  @Get('search')
  search(
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.sweetsService.search({
      name,
      category,
      minPrice,
      maxPrice,
    });
  }

  // UPDATE SWEET (ADMIN) ✅ REQUIRED
  @Put(':id')
  @Roles('ADMIN')
  update(@Param('id') id: number, @Body() body: UpdateSweetDto) {
    return this.sweetsService.update(id, body);
  }

  // PURCHASE SWEET
  @Post(':id/purchase')
  purchase(@Param('id') id: number) {
    return this.sweetsService.purchase(id);
  }

  // RESTOCK SWEET (ADMIN)
  @Post(':id/restock')
  @Roles('ADMIN')
  restock(@Param('id') id: number) {
    return this.sweetsService.restock(id);
  }

  // DELETE SWEET (ADMIN)
  @Delete(':id')
  @Roles('ADMIN')
  delete(@Param('id') id: number) {
    return this.sweetsService.delete(id);
  }
}
