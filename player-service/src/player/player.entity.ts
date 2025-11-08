import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; 

    @Entity('players') 
    export class Player { 
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ unique: true }) 
    username: string; 

    @Column({ nullable: true }) 
    email?: string;

    @Column({ nullable: true }) 
    avatar?: string; 

    @Column({ default: 1 }) 
    level: number;

    @Column({ 
    type: 'bigint', default: 0 }) xp: number; 

    @Column({ default: 0 }) 
    wins: number; 

    @Column({ name: 'matches_played', default: 0 }) 
    matchesPlayed: number; 

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    createdAt: Date; 

    @Column({ name: 'update_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    updatedAt: Date; 
}