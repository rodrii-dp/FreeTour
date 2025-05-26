// src/services/all.services.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
  Provider,
  ProviderDocument,
  Review,
  ReviewDocument,
  Tour,
  TourDocument,
  Service as ServiceModel,
  ServiceDocument,
  Stop,
  StopDocument,
  ImageTour,
  ImageTourDocument,
  Availability,
  AvailabilityDocument,
} from '../schemas/all.schema.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: Partial<User>): Promise<UserDocument> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string) {
    await this.userModel.deleteOne({ _id: id });
  }
}

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
  ) {}

  async create(provider: Partial<Provider>): Promise<Provider> {
    return this.providerModel.create(provider);
  }

  async findAll(): Promise<Provider[]> {
    return this.providerModel.find().exec();
  }

  async findById(id: string): Promise<Provider | null> {
    return this.providerModel.findById(id).exec();
  }

  async update(
    providerId,
    provider: Partial<Provider>,
  ): Promise<Provider | null> {
    return this.providerModel
      .findByIdAndUpdate(providerId, provider, { new: true })
      .exec();
  }

  async delete(providerId: string): Promise<Provider | null> {
    return this.providerModel.findByIdAndDelete(providerId).exec();
  }
}

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(review: Partial<Review>): Promise<Review> {
    return this.reviewModel.create(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findById(id: string): Promise<Review | null> {
    return this.reviewModel.findById(id).exec();
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
    try {
      return await this.tourModel.findById(id).populate('provider').exec();
    } catch (error) {
      console.log('entro');
      return await this.tourModel.findById(id).exec();
    }
  }

  async findWithFilters(filters: {
    title?: string;
    category?: string;
    limit?: string;
    providerId?: string;
  }) {
    const query: any = {};
    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' };
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.providerId) {
      query.provider = filters.providerId;
    }

    const limit = filters.limit ? parseInt(filters.limit, 10) : 20;
    return this.tourModel.find(query).limit(limit).exec();
  }

  async update(
    tourId: string,
    providerId: string,
    tour: Partial<Tour>,
  ): Promise<Tour | null> {
    const existingTour = await this.tourModel.findById(tourId).exec();

    if (!existingTour) {
      return null;
    }

    if (existingTour.provider.toString() !== providerId) {
      throw new Error('No tienes permiso para editar este tour');
    }

    const updatedTour = await this.tourModel
      .findByIdAndUpdate(tourId, tour, { new: true })
      .populate('provider')
      .exec();

    if (!updatedTour) {
      throw new Error('Error al actualizar el tour');
    }

    return updatedTour;
  }

  async findMostRecent(limit: number): Promise<Tour[]> {
    return this.tourModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('provider')
      .exec();
  }

  async getMostPopularsByCategory(
    category: string,
    limit: number,
  ): Promise<Tour[]> {
    return this.tourModel
      .find({ category: category })
      .sort({ rating: -1 })
      .limit(limit)
      .populate('provider')
      .exec();
  }

  async delete(tourId: string): Promise<Tour | null> {
    return this.tourModel.findByIdAndDelete(tourId).exec();
  }
}

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(ServiceModel.name)
    private serviceModel: Model<ServiceDocument>,
  ) {}

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
  constructor(
    @InjectModel(ImageTour.name) private imageModel: Model<ImageTourDocument>,
  ) {}

  async create(image: Partial<ImageTour>): Promise<ImageTour> {
    return this.imageModel.create(image);
  }

  async findAll(): Promise<ImageTour[]> {
    return this.imageModel.find().exec();
  }
}

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name)
    private availabilityModel: Model<AvailabilityDocument>,
  ) {}

  async create(avail: Partial<Availability>): Promise<Availability> {
    return this.availabilityModel.create(avail);
  }

  async findAll(): Promise<Availability[]> {
    return this.availabilityModel.find().exec();
  }
}
