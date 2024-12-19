import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AirportDocument = HydratedDocument<Airport>;

@Schema()
export class Airport {
  _id: Types.ObjectId;
  __v: number;

  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ default: 'Vietnam' })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);
