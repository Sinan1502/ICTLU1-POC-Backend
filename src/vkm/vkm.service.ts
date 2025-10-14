import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keuzemodule } from './schemas/keuzemodules.schema';
import { CreateKeuzemoduleDto, UpdateKeuzemoduleDto } from './dtos/keuzemodule.dto';

@Injectable()
export class KeuzemodulesService {
  constructor(
    @InjectModel(Keuzemodule.name)
    private keuzemoduleModel: Model<Keuzemodule>,
  ) {}

  async findAll() {
    return this.keuzemoduleModel.find().exec();
  }

  async findOne(id: string) {
    const keuzemodule = await this.keuzemoduleModel.findById(id).exec();
    if (!keuzemodule) {
      throw new NotFoundException(`Keuzemodule with ID ${id} not found`);
    }
    return keuzemodule;
  }

  async create(createDto: CreateKeuzemoduleDto) {
    const newModule = new this.keuzemoduleModel(createDto);
    return newModule.save();
  }

  async update(id: string, updateDto: UpdateKeuzemoduleDto) {
    const updatedModule = await this.keuzemoduleModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!updatedModule) {
      throw new NotFoundException(`Keuzemodule with ID ${id} not found`);
    }
    return updatedModule;
  }

  async delete(id: string) {
    const result = await this.keuzemoduleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Keuzemodule with ID ${id} not found`);
    }
    return { message: 'Keuzemodule successfully deleted', id };
  }
}