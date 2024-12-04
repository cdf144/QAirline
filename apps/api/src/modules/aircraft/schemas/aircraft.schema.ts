import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AircraftDocument = HydratedDocument<Aircraft>;

@Schema()
export class Aircraft {
  @Prop()
  manufacturer: string;

  @Prop()
  model: string;

  @Prop()
  totalSeat: number;

  @Prop({ default: null })
  economySeat: number;

  @Prop({ default: null })
  businessSeat: number;

  @Prop()
  createdAt: Date;
}

export const AircraftSchema = SchemaFactory.createForClass(Aircraft);
