import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  UserService,
  ProviderService,
  ReviewService,
  TourService,
  CategoryService,
  StopService,
  AvailabilityService,
} from '../services/all.service';

import {
  User,
  Provider,
  Review,
  Tour,
  Category,
  Stop,
  Availability,
} from '../schemas/all.schema';

// USER
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: Partial<User>) {
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
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
}

// TOUR
@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  create(@Body() tour: Partial<Tour>) {
    return this.tourService.create(tour);
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
    @Body() providerId: string,
    tour: Partial<Tour>,
  ) {
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
@Controller('category')
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
