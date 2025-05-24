import * as bcrypt from 'bcryptjs';

// src/schemas/all.schemas.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

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
}
export const UserSchema = SchemaFactory.createForClass(User);

// Service
@Schema()
export class Service {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon: string;
}
export const ServiceSchema = SchemaFactory.createForClass(Service);

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

// Tour
@Schema()
export class Tour {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [ImageTourSchema], default: [] })
  images: ImageTour[];

  @Prop({ type: Types.ObjectId, ref: 'Provider', required: true })
  provider: Types.ObjectId;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];

  @Prop()
  description: string;

  @Prop()
  duration: string;

  @Prop({ type: [String], default: [] })
  language: string[];

  @Prop({
    type: {
      value: { type: Number, required: true, min: 0},
      basedOnTips: { type: Boolean, required: true },
    },
  })
  price: {
    value: number;
    basedOnTips: boolean;
    discount?: {
      type: 'porcentaje' | 'valor';
      amount: number; // Ej: 10 (10% o 10€ según el tipo)
      description?: string;
      validFrom?: string;
      validTo?: string; 
    };
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
  availableDates: Availability[];
}
export const TourSchema = SchemaFactory.createForClass(Tour);

export type UserDocument = GenericDocument<User>;
export type ProviderDocument = GenericDocument<Provider>;
export type ReviewDocument = GenericDocument<Review>;
export type TourDocument = GenericDocument<Tour>;
export type ServiceDocument = GenericDocument<Service>;
export type StopDocument = GenericDocument<Stop>;
export type ImageTourDocument = GenericDocument<ImageTour>;
export type AvailabilityDocument = GenericDocument<Availability>;

UserSchema.pre<UserDocument>('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
