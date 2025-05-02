// src/services/all.services.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User, UserDocument,
  Provider, ProviderDocument,
  Review, ReviewDocument,
  Tour, TourDocument,
  Service as ServiceModel, ServiceDocument,
  Stop, StopDocument,
  ImageTour, ImageTourDocument,
  Availability, AvailabilityDocument
} from '../schemas/all.schema.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}

@Injectable()
export class ProviderService {
  constructor(@InjectModel(Provider.name) private providerModel: Model<ProviderDocument>) {}

  async create(provider: Partial<Provider>): Promise<Provider> {
    return this.providerModel.create(provider);
  }

  async findAll(): Promise<Provider[]> {
    return this.providerModel.find().exec();
  }
}

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

  async create(review: Partial<Review>): Promise<Review> {
    return this.reviewModel.create(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }
}

@Injectable()
export class TourService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  async create(tour: Partial<Tour>): Promise<Tour> {
    return this.tourModel.create(tour);
  }

  async findAll(): Promise<Tour[]> {
    return this.tourModel.find().populate('provider').exec();
  }

  async findById(id: string): Promise<Tour | null> {
    return this.tourModel.findById(id).populate('provider').exec();
  }
}

@Injectable()
export class ServiceService {
  constructor(@InjectModel(ServiceModel.name) private serviceModel: Model<ServiceDocument>) {}

  async create(service: Partial<ServiceModel>): Promise<ServiceModel> {
    return this.serviceModel.create(service);
  }

  async findAll(): Promise<ServiceModel[]> {
    return this.serviceModel.find().exec();
  }
}

@Injectable()
export class StopService {
  constructor(@InjectModel(Stop.name) private stopModel: Model<StopDocument>) {}

  async create(stop: Partial<Stop>): Promise<Stop> {
    return this.stopModel.create(stop);
  }

  async findAll(): Promise<Stop[]> {
    return this.stopModel.find().exec();
  }
}

@Injectable()
export class ImageTourService {
  constructor(@InjectModel(ImageTour.name) private imageModel: Model<ImageTourDocument>) {}

  async create(image: Partial<ImageTour>): Promise<ImageTour> {
    return this.imageModel.create(image);
  }

  async findAll(): Promise<ImageTour[]> {
    return this.imageModel.find().exec();
  }
}

@Injectable()
export class AvailabilityService {
  constructor(@InjectModel(Availability.name) private availabilityModel: Model<AvailabilityDocument>) {}

  async create(avail: Partial<Availability>): Promise<Availability> {
    return this.availabilityModel.create(avail);
  }

  async findAll(): Promise<Availability[]> {
    return this.availabilityModel.find().exec();
  }
}

