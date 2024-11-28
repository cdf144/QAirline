import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

export enum ClassType {
  Economy = 'economy',
  Business = 'business',
}

export enum TripType {
  OneWay = 'oneway',
  RoundTrip = 'roundtrip',
}

export enum Status {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Schema()
export class Ticket {
  @Prop()
  bookingId: number;

  @Prop({ enum: TripType })
  tripType: TripType;

  @Prop()
  userEmail: string;

  @Prop({ type: Types.ObjectId, ref: 'Flight', default: null })
  outBoundFlightId: number;

  @Prop({ type: Types.ObjectId, ref: 'Flight', default: null })
  returnFlightId: number;

  @Prop()
  seat: string;

  @Prop({ enum: Status })
  status: Status;

  @Prop()
  totalPrice: number;

  @Prop()
  bookTime: Date;

  @Prop()
  departureTime: Date;

  @Prop()
  classType: ClassType;

  @Prop()
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
