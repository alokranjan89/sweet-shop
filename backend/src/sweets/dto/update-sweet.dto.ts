import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSweetDto {
  @ApiPropertyOptional({ example: 'Kaju Katli' })
  name?: string;

  @ApiPropertyOptional({ example: 'Indian' })
  category?: string;

  @ApiPropertyOptional({ example: 40 })
  price?: number;

  @ApiPropertyOptional({ example: 100 })
  quantity?: number;
}
