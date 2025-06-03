import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query, UseGuards, Request, BadRequestException
} from '@nestjs/common';
import {
  UserService,
  ProviderService,
  ReviewService,
  TourService,
  CategoryService,
  StopService,
  AvailabilityService,
  BookingService,
} from '../services/all.service';

import {
  User,
  Provider,
  Review,
  Tour,
  Category,
  Stop,
  Availability,
  Booking,
} from '../schemas/all.schema';
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

// USER
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}

// PROVIDER
@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  create(@Body() provider: Partial<Provider>) {
    return this.providerService.create(provider);
  }

  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.providerService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() provider: Partial<Provider>) {
    return this.providerService.update(id, provider);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.providerService.delete(id);
  }
}

// REVIEW
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() review: Partial<Review>) {
    return this.reviewService.create(review);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewService.findById(id);
  }

  @Get('tour/:tourId')
  async getReviewsByTour(@Param('tourId') tourId: string): Promise<Review[]> {
    return this.reviewService.getReviewsByTourId(tourId);
  }

  @Get('user/:userId')
  async getReviewsByUser(@Param('userId') userId: string): Promise<Review[]> {
    return this.reviewService.getReviewsByUserId(userId);
  }

  @Get('user/:userId/review/:reviewId')
  async getReviewByUserAndReviewId(
    @Param('userId') userId: string,
    @Param('reviewId') reviewId: string,
  ): Promise<Review> {
    return this.reviewService.getReviewByUserAndReviewId(userId, reviewId);
  }
}

// TOUR
@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService, private readonly providerService: ProviderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() tour: Partial<Tour>, @Request() req) {
    const userId = req.user.userId;

    const provider = await this.providerService.findByUserId(userId);

    if (!provider) {
      throw new BadRequestException("No se encontró un proveedor asociado a este usuario")
    }

    const providerId = (provider as any)._id || provider.toString();

    const tourWithProvider = {
      ...tour,
      provider: providerId,
    }

    return this.tourService.create(tourWithProvider);
  }

  @Get('recent')
  findMostRecent(@Query('limit') limit?: string) {
    return this.tourService.findMostRecent(Number(limit) || 5);
  }

  @Get()
  findWithFilters(
    @Query('title') title?: string,
    @Query('category') category?: string,
    @Query('providerId') providerId?: string,
    @Query('limit') limit?: string,
  ) {
    return this.tourService.findWithFilters({
      title,
      category,
      providerId,
      limit,
    });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tourService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') tourId: string,
    @Body() body: { providerId: string; tour: Partial<Tour> },
  ) {
    const { providerId, tour } = body;
    return this.tourService.update(tourId, providerId, tour);
  }

  @Get('popular/:category')
  getMostPopularsByCategory(
    @Param('category') category: string,
    @Query('limit') limit: number,
  ) {
    return this.tourService.getMostPopularsByCategory(category, limit);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tourService.delete(id);
  }
}

// SERVICE
@Controller('categories')
export class CategoryController {
  constructor(private readonly serviceService: CategoryService) {}

  @Post()
  create(@Body() service: Partial<Category>) {
    return this.serviceService.create(service);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}

// STOP
@Controller('stops')
export class StopController {
  constructor(private readonly stopService: StopService) {}

  @Post()
  create(@Body() stop: Partial<Stop>) {
    return this.stopService.create(stop);
  }

  @Get()
  findAll() {
    return this.stopService.findAll();
  }
}

// AVAILABILITY
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() availability: Partial<Availability>) {
    return this.availabilityService.create(availability);
  }

  @Get()
  findAll() {
    return this.availabilityService.findAll();
  }
}

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() booking: Partial<Booking>) {
    return this.bookingService.create(booking);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookingService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.bookingService.findByUserId(userId);
  }

  @Get('tour/:tourId')
  findByTourId(@Param('tourId') tourId: string) {
    return this.bookingService.findByTourId(tourId);
  }

  @Delete(':id')
  cancelBooking(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }

  @Patch(':id')
  updateBooking(@Param('id') id: string, @Body() update: Partial<Booking>) {
    return this.bookingService.updateBooking(id, update);
  }
}
