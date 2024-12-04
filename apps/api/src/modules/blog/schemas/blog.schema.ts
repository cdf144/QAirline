import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

export enum Category {
  Notification = 'notification',
  News = 'news',
  Promotion = 'promotion',
}

@Schema()
export class Blog {
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  adminId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ enum: Category, required: true })
  category: Category;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
