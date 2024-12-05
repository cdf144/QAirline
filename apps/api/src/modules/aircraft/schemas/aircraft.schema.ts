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

  @Prop()
  economySeat: number;

  @Prop({ default: 0 })
  businessSeat: number;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const AircraftSchema = SchemaFactory.createForClass(Aircraft);
