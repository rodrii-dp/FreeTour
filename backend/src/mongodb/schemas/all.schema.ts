import * as bcrypt from 'bcryptjs';

// src/schemas/all.schemas.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GenericDocument<T> = HydratedDocument<T>;
// User
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['cliente', 'proveedor'], required: true })
  role: 'cliente' | 'proveedor';

  @Prop({ default: false })
  verified: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);

export enum FixedCategories {
  Gastronomia = 'gastronomía',
  Historia = 'historia',
  Naturaleza = 'naturaleza',
  Aventura = 'aventura',
  Otros = 'otros',
}

// Category
@Schema()
export class Category {
  @Prop({ required: true, enum: Object.values(FixedCategories) })
  name: string;

  @Prop({ required: true })
  icon: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

// Stop
@Schema()
export class Stop {
  @Prop({ required: true })
  stopName: string;

  @Prop({
    required: true,
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      direction: { type: String, required: true },
    },
  })
  location: {
    lat: number;
    lng: number;
    direction: string;
  };
}
export const StopSchema = SchemaFactory.createForClass(Stop);

// Provider
@Schema()
export class Provider {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Tour' })
  tours: Types.ObjectId[];

  @Prop()
  direction: string;

  @Prop()
  contact: string;

  @Prop({
    enum: ['verificado', 'pendiente', 'no verificado'],
    default: 'pendiente',
  })
  verificationStatus: 'verificado' | 'pendiente' | 'no verificado';
}
export const ProviderSchema = SchemaFactory.createForClass(Provider);

// Review
@Schema()
export class Review {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tour', required: true })
  tourId: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop()
  comment: string;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);

// ImageTour
@Schema()
export class ImageTour {
  @Prop({ required: true })
  imageUrl: string;
}
export const ImageTourSchema = SchemaFactory.createForClass(ImageTour);

// Availability
@Schema()
export class Availability {
  @Prop({ required: true })
  date: string;

  @Prop({ type: [String], required: true })
  hours: string[];
}
export const AvailabilitySchema = SchemaFactory.createForClass(Availability);

@Schema()
class Discount {
  @Prop({ enum: ['porcentaje', 'valor'], required: true })
  type: 'porcentaje' | 'valor';

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;

  @Prop()
  validFrom?: string;

  @Prop()
  validTo?: string;
}
const DiscountSchema = SchemaFactory.createForClass(Discount);

// Tour
@Schema()
export class Tour {
  @Prop({ required: true, enum: Object.values(FixedCategories) })
  category: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [ImageTourSchema], default: [] })
  images: ImageTour[];

  @Prop({ type: Types.ObjectId, ref: 'Provider', required: true })
  provider: Types.ObjectId;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  reviews: Types.ObjectId[];

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop({ type: [String], default: [] })
  language: string[];

  @Prop({
    type: {
      value: { type: Number, required: true, min: 0 },
      basedOnTips: { type: Boolean, required: true },
      discount: { type: DiscountSchema, required: false },
    },
  })
  price: {
    value: number;
    basedOnTips: boolean;
    discount?: Discount;
  };

  @Prop({ type: [StopSchema], default: [] })
  stops: Stop[];

  @Prop({
    type: {
      name: String,
      country: String,
    },
  })
  location: {
    name: string;
    country: string;
  };

  @Prop()
  meetingPoint: string;

  @Prop({ type: [AvailabilitySchema], default: [] })
  nonAvailableDates: Availability[];
}
export const TourSchema = SchemaFactory.createForClass(Tour);
TourSchema.set('timestamps', true);

// Booking
@Schema()
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tour', required: true })
  tourId: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  hour: string;

  @Prop({ default: 1 })
  people: number;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);

export type UserDocument = GenericDocument<User>;
export type ProviderDocument = GenericDocument<Provider>;
export type ReviewDocument = GenericDocument<Review>;
export type TourDocument = GenericDocument<Tour>;
export type CategoryDocument = GenericDocument<Category>;
export type StopDocument = GenericDocument<Stop>;
export type ImageTourDocument = GenericDocument<ImageTour>;
export type AvailabilityDocument = GenericDocument<Availability>;
export type DiscountDocument = GenericDocument<Discount>;
export type BookingDocument = GenericDocument<Booking>;
UserSchema.pre<UserDocument>('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
