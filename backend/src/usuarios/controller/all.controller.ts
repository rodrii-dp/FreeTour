import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  UserService,
  ProviderService,
  ReviewService,
  TourService,
  ServiceService,
  StopService,
  AvailabilityService,
} from '../services/all.service';

import { User, Provider, Review, Tour, Service, Stop, Availability } from '../schemas/all.schema';

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
  findAll() {
    return this.tourService.findAll();
  }
}

// SERVICE
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() service: Partial<Service>) {
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
