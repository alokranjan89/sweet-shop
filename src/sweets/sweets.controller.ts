import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SweetsService } from './sweets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/sweets')
@UseGuards(JwtAuthGuard)
export class SweetsController {
  constructor(private sweetsService: SweetsService) {}

  // ADD SWEET (ADMIN)
  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  addSweet(@Body() body: any) {
    return this.sweetsService.createSweet(body);
  }

  // GET ALL SWEETS
  @Get()
  getSweets() {
    return this.sweetsService.getAllSweets();
  }

  // PURCHASE SWEET
  @Post(':id/purchase')
  purchaseSweet(@Param('id') id: string) {
    return this.sweetsService.purchaseSweet(Number(id));
  }

  // RESTOCK SWEET (ADMIN)
  @Post(':id/restock')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  restockSweet(
    @Param('id') id: string,
    @Body('amount') amount: number,
  ) {
    return this.sweetsService.restockSweet(Number(id), amount);
  }

  // SEARCH SWEETS
  @Get('search')
  search(@Query() query: any) {
    return this.sweetsService.searchSweets(query);
  }

  // DELETE SWEET (ADMIN)
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  deleteSweet(@Param('id') id: string) {
    return this.sweetsService.deleteSweet(Number(id));
  }
}
