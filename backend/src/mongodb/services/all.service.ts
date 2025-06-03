// src/services/all.services.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  User,
  UserDocument,
  Provider,
  ProviderDocument,
  Review,
  ReviewDocument,
  Tour,
  TourDocument,
  Category,
  CategoryDocument,
  Stop,
  StopDocument,
  ImageTour,
  ImageTourDocument,
  Availability,
  AvailabilityDocument,
  Booking,
  BookingDocument,
} from '../schemas/all.schema.js';
import { MailService } from '../../auth/mail.service';

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

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  async update(id: string, data: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
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

  async findByUserId(userId: string): Promise<Provider | null> {
    return this.providerModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
  }

  async findAllByUserId(userId: string) {
    return this.providerModel.find({ userId });
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

  async getReviewsByUserId(userId: string): Promise<Review[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('User ID inválido');
    }

    const reviews = await this.reviewModel.find({ userId }).exec();

    if (!reviews || reviews.length === 0) {
      throw new NotFoundException(
        'No se encontraron reseñas para este usuario',
      );
    }

    return reviews;
  }

  async getReviewByUserAndReviewId(
    userId: string,
    reviewId: string,
  ): Promise<Review> {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(reviewId)) {
      throw new NotFoundException('ID inválido');
    }

    const review = await this.reviewModel
      .findOne({ _id: reviewId, userId })
      .exec();

    if (!review) {
      throw new NotFoundException('Reseña no encontrada para este usuario');
    }

    return review;
  }

  async getReviewsByTourId(tourId: string): Promise<Review[]> {
    if (!Types.ObjectId.isValid(tourId)) {
      throw new NotFoundException('Tour ID inválido');
    }

    const reviews = await this.reviewModel.find({ tourId }).exec();

    if (!reviews || reviews.length === 0) {
      throw new NotFoundException('No se encontraron reseñas para este tour');
    }

    return reviews;
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

  async findByProvider(providerId: string): Promise<Tour[]> {
    return this.tourModel.find({ provider: providerId }).exec();
  }

  async findWithFilters(filters: {
    title?: string;
    category?: string;
    limit?: string;
    onlyDiscounted?: boolean;
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

    if (filters.onlyDiscounted) {
      query['price.discount'] = { $exists: true, $ne: null };
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
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(category: Partial<Category>): Promise<Category> {
    return this.categoryModel.create(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async delete(categoryId: string): Promise<Category | null> {
    return this.categoryModel.findByIdAndDelete(categoryId).exec();
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

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<BookingDocument>,
    private readonly mailService: MailService
  ) {}

  async create(booking: Partial<Booking>): Promise<Booking> {
    if (!booking.tourId || !booking.date || !booking.hour) {
      throw new NotFoundException('Faltan datos para la reserva');
    }

    const existingBooking = await this.bookingModel.findOne({
      userId: booking.userId,
      tourId: booking.tourId,
      date: booking.date,
      hour: booking.hour,
    })

    if (existingBooking) {
      throw new NotFoundException('Ya tienes una reserva para esta fecha y hora');
    }

    const tour = await this.bookingModel.db
      .model('Tour')
      .findById(booking.tourId)
      .exec();
    if (!tour) throw new NotFoundException('Tour no encontrado');

    const nonAvailableDate = tour.nonAvailableDates.find(
      (d) => d.date === booking.date && d.hours.includes(booking.hour),
    );
    if (nonAvailableDate)
      throw new NotFoundException('Fecha u hora no disponible');

    const createdBooking = await this.bookingModel.create(booking);

    const user = await this.bookingModel.db
      .model('User')
      .findById(booking.userId)
      .exec();

    if (user && user.email) {
      await this.mailService.sendBookingInformationEmail(user.email, {
        tourTitle: tour.title,
        date: booking.date,
        hour: booking.hour,
        people: booking.people,
      });
    }

    return createdBooking;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookingModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('ID de usuario inválido');
    }
    return this.bookingModel.find({ userId }).populate('tourId').exec();
  }

  async findByTourId(tourId: string): Promise<Booking[]> {
    if (!Types.ObjectId.isValid(tourId)) {
      throw new NotFoundException('ID de tour inválido');
    }
    return this.bookingModel.find({ tourId }).exec();
  }

  async cancelBooking(bookingId: string): Promise<Booking | null> {
    if (!Types.ObjectId.isValid(bookingId)) {
      throw new NotFoundException('ID de reserva inválido');
    }
    return this.bookingModel.findByIdAndDelete(bookingId).exec();
  }

  async updateBooking(
    bookingId: string,
    update: Partial<Booking>,
  ): Promise<Booking | null> {
    if (!Types.ObjectId.isValid(bookingId)) {
      throw new NotFoundException('ID de reserva inválido');
    }
    return this.bookingModel
      .findByIdAndUpdate(bookingId, update, { new: true })
      .exec();
  }
}
