import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FlightDocument = HydratedDocument<Flight>;

export enum Status {
  Scheduled = 'Scheduled',
  Delayed = 'Delayed',
  Cancelled = 'Cancelled',
  Flying = 'Flying',
  Landed = 'Landed',
}

@Schema()
export class Flight {
  @Prop()
  aircraftId: number;

  @Prop({ type: Types.ObjectId, ref: 'Airport', default: null })
  departureAirportId: number;

  @Prop({ type: Types.ObjectId, ref: 'Airport', default: null })
  destinationAirportId: number;

  @Prop()
  dayFlight: Date;

  @Prop({ enum: Status })
  status: Status;

  @Prop()
  price: number;

  @Prop()
  createdAt: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
