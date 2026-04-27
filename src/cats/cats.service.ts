import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User> 
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.validateBreed(createCatDto.breed);
    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
    });
  }

  async findAll() {
    return 'findAll'
  }

  async findOne(id: number,) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    await this.findOne(id );
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
    })
  }

  async remove(id: number) {
    await this.findOne(id );
    return await this.catRepository.softDelete({ id }); // se le pasa el id
  }


  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;
  }
}
