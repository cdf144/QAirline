import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

export enum TripType {
  OneWay = 'oneway',
  RoundTrip = 'roundtrip',
}

export enum TicketStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Schema()
export class Ticket {
  @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
  bookingId: Types.ObjectId;

  @Prop({ enum: TripType, default: TripType.OneWay })
  tripType: TripType;

  @Prop({ type: Types.ObjectId, ref: 'Flight', required: true })
  outboundFlightId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Flight', default: null })
  returnFlightId: Types.ObjectId;

  @Prop({ required: true })
  seat: string;

  @Prop({ enum: TicketStatus, default: TicketStatus.Pending })
  status: TicketStatus;

  @Prop({ type: Types.Decimal128, required: true })
  totalPrice: Types.Decimal128;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
