// src/modules/general.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/all.schema';
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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
})
export class GeneralModule {}

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class UsuarioModule {}
