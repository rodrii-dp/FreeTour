// src/modules/general.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Availability, AvailabilitySchema, ImageTour, ImageTourSchema, Provider, ProviderSchema, Review, ReviewSchema, Service, ServiceSchema, Stop, StopSchema, Tour, TourSchema, User, UserSchema } from './schemas/all.schema';
import {
  UserService,
  ProviderService,
  ReviewService,
  TourService,
  ServiceService,
  StopService,
  ImageTourService,
  AvailabilityService,
} from './services/all.service'; // Servicios
import {
  UserController,
  ProviderController,
  ReviewController,
  TourController,
  ServiceController,
  StopController,
  AvailabilityController,
} from './controller/all.controller'; // Controladores

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Tour.name, schema: TourSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Stop.name, schema: StopSchema },
      { name: ImageTour.name, schema: ImageTourSchema },
      { name: Availability.name, schema: AvailabilitySchema },
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [
    UserController,
    ProviderController,
    ReviewController,
    TourController,
    ServiceController,
    StopController,
    AvailabilityController,
  ], // Todos los controladores
  providers: [
    UserService,
    ProviderService,
    ReviewService,
    TourService,
    ServiceService,
    StopService,
    ImageTourService,
    AvailabilityService,
  ], // Todos los servicios
  exports: [UserService],
})
export class GeneralModule {}
