import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
  Provider,
  ProviderSchema,
  Review,
  ReviewSchema,
  Tour,
  TourSchema,
  Service,
  ServiceSchema,
  Stop,
  StopSchema,
  Availability,
  AvailabilitySchema,
  ImageTour,
  ImageTourSchema,
} from './schemas/all.schema';

// Importa los controladores
import {
  UserController,
  ProviderController,
  ReviewController,
  TourController,
  ServiceController,
  StopController,
  AvailabilityController,
} from './controller/all.controller';

// Importa los servicios
import {
  UserService,
  ProviderService,
  ReviewService,
  TourService,
  ServiceService,
  StopService,
  ImageTourService,
  AvailabilityService,
} from './services/all.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Tour.name, schema: TourSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Stop.name, schema: StopSchema },
      { name: Availability.name, schema: AvailabilitySchema },
      { name: ImageTour.name, schema: ImageTourSchema },
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
  ],
  providers: [
    UserService,
    ProviderService,
    ReviewService,
    TourService,
    ServiceService,
    StopService,
    ImageTourService,
    AvailabilityService,
  ],
})
export class GeneralModule {}
