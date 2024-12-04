import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/common/role.enum';

export type UserDocument = HydratedDocument<User>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop({ enum: Gender })
  sex: Gender;

  @Prop({ unique: true })
  phone: string;

  @Prop({ unique: true })
  idCardNumber: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ type: [String], enum: Role, default: [Role.User] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
