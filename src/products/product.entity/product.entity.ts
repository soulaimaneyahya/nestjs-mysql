import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({ default: true})
    isAvailable: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: string;
}
