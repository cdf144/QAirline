import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

export enum Category {
  Notification = 'Notification',
  News = 'News',
  Promotion = 'Promotion',
}

@Schema()
export class Blog {
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  adminId: number;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ enum: Category })
  category: Category;

  @Prop()
  createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
