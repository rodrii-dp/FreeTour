import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Availability,
  AvailabilitySchema,
  ImageTour,
  ImageTourSchema,
  Provider,
  ProviderSchema,
  Review,
  ReviewSchema,
  Category,
  CategorySchema,
  Stop,
  StopSchema,
  Tour,
  TourSchema,
  User,
  UserSchema,
  BookingSchema,
  Booking,
} from './schemas/all.schema';
import {
  UserService,
  ProviderService,
  ReviewService,
  TourService,
  CategoryService,
  StopService,
  ImageTourService,
  AvailabilityService,
  BookingService,
} from './services/all.service';
import {
  UserController,
  ProviderController,
  ReviewController,
  TourController,
  CategoryController,
  StopController,
  AvailabilityController,
  BookingController,
} from './controller/all.controller';
import { MailModule } from '../auth/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Tour.name, schema: TourSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Stop.name, schema: StopSchema },
      { name: ImageTour.name, schema: ImageTourSchema },
      { name: Availability.name, schema: AvailabilitySchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
    MailModule,
  ],
  controllers: [
    UserController,
    ProviderController,
    ReviewController,
    TourController,
    CategoryController,
    StopController,
    AvailabilityController,
    BookingController,
  ],
  providers: [
    UserService,
    ProviderService,
    ReviewService,
    TourService,
    CategoryService,
    StopService,
    ImageTourService,
    AvailabilityService,
    BookingService,
  ],
  exports: [UserService],
})
export class GeneralModule {}
