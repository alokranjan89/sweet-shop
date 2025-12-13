import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sweet } from './sweet.entity';
import { SweetsService } from './sweets.service';
import { SweetsController } from './sweets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sweet])],
  controllers: [SweetsController],
  providers: [SweetsService],
})
export class SweetsModule {}
