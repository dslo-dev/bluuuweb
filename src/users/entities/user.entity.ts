import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({ type: 'varchar', length: 100, nullable: false })
   name!: string;

   @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
   email!: string;

   @Column({ type: 'varchar', nullable: false })
   password!: string;

    @Column({ default: 'user', nullable: false  })
	rol: string

   @CreateDateColumn({ name: 'created_at' })
   createdAt!: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt!: Date;
}
