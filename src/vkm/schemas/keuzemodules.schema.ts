import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'keuzemodules', timestamps: true })
export class Keuzemodule extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  shortdescription: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  studycredit: number;

  @Prop()
  location: string;

  @Prop()
  contact_id: number;

  @Prop()
  level: string;

  @Prop()
  learningoutcomes: string;
}

export const KeuzemoduleSchema = SchemaFactory.createForClass(Keuzemodule);