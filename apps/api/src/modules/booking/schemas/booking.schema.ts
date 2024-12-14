import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

export enum ClassType {
  Economy = 'economy',
  Business = 'business',
}

@Schema()
export class Booking {
  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ enum: ClassType, default: ClassType.Economy })
  classType: ClassType;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
