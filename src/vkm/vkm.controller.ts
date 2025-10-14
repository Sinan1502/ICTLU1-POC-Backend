import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req, ConflictException, NotFoundException, } from '@nestjs/common';
import { KeuzemodulesService } from './vkm.service';
import { CreateKeuzemoduleDto } from './dtos/keuzemodule.dto';
import { AuthGuard } from '../guards/auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './schemas/favorite.schema';

@Controller('keuzemodules')
export class KeuzemodulesController {
  constructor(
    private readonly service: KeuzemodulesService,
    @InjectModel(Favorite.name)
    private favoriteModel: Model<Favorite>,
  ) {}

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDto: CreateKeuzemoduleDto) {
    return this.service.create(createDto);
  }

  @UseGuards(AuthGuard)
  @Get('favorite')
  async getFavorites(@Req() req) {
    const userId = req.userId;
    return this.favoriteModel.find({ userId }).populate('moduleId').exec();
  }

  @UseGuards(AuthGuard)
  @Post(':id/favorite')
  async addFavorite(@Param('id') moduleId: string, @Req() req) {
    const userId = req.userId;
    const exists = await this.favoriteModel.findOne({ userId, moduleId });
    if (exists) throw new ConflictException('Module already in favorites');
    return this.favoriteModel.create({ userId, moduleId });
  }

  @UseGuards(AuthGuard)
  @Delete(':id/favorite')
  async removeFavorite(@Param('id') moduleId: string, @Req() req) {
    const userId = req.userId;
    const result = await this.favoriteModel.findOneAndDelete({ userId, moduleId });
    if (!result) throw new NotFoundException('Favorite not found');
    return { message: 'Removed from favorites' };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}