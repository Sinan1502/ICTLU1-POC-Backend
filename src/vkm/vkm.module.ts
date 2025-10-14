import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Keuzemodule, KeuzemoduleSchema } from './schemas/keuzemodules.schema';
import { KeuzemodulesService } from './vkm.service';
import { KeuzemodulesController } from './vkm.controller';
import { Favorite, FavoriteSchema } from './schemas/favorite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Keuzemodule.name, schema: KeuzemoduleSchema },
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  controllers: [KeuzemodulesController],
  providers: [KeuzemodulesService],
  exports: [KeuzemodulesService], 
})
export class KeuzemodulesModule {}