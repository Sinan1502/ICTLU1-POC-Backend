import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'favorites', timestamps: true })
export class Favorite extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Keuzemodule', required: true })
  moduleId: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);