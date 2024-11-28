import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AirportDocument = HydratedDocument<Airport>;

@Schema()
export class Airport {
  @Prop({ unique: true })
  code: number;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  createdAt: Date;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);
