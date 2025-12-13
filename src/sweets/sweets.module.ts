import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sweet } from './sweet.entity';
import { SweetsService } from './sweets.service';
import { SweetsController } from './sweets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sweet])],
  providers: [SweetsService],
  controllers: [SweetsController],
})
export class SweetsModule {}
