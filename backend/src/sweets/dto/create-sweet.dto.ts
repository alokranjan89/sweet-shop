import { ApiProperty } from '@nestjs/swagger';

export class CreateSweetDto {
  @ApiProperty({ example: 'Kaju Katli' })
  name: string;

  @ApiProperty({ example: 'Indian' })
  category: string;

  @ApiProperty({ example: 30 })
  price: number;

  @ApiProperty({ example: 25 })
  quantity: number;
}
