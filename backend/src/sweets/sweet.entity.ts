import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
