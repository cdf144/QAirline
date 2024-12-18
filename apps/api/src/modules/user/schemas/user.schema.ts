import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../../common/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

@Schema()
export class User {
  _id: string;
  __v: number;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullName: string;

  @Prop({ enum: Gender })
  sex: Gender;

  @Prop({ unique: true, sparse: true })
  phone: string;

  @Prop({ unique: true, sparse: true })
  idCardNumber: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ type: [String], enum: Role, default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
