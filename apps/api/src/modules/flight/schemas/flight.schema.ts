import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FlightDocument = HydratedDocument<Flight>;

export enum FlightStatus {
  Scheduled = 'scheduled',
  Delayed = 'delayed',
  Cancelled = 'cancelled',
  Flying = 'flying',
  Landed = 'landed',
}

@Schema()
export class Flight {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'Aircraft', required: true })
  aircraftId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Airport', required: true })
  departureAirportId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Airport', required: true })
  destinationAirportId: Types.ObjectId;

  @Prop({ required: true })
  departureTime: Date;

  @Prop({ required: true })
  arrivalTime: Date;

  @Prop({ enum: FlightStatus, default: FlightStatus.Scheduled })
  status: FlightStatus;

  @Prop({ type: Types.Decimal128, required: true })
  price: Types.Decimal128;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
