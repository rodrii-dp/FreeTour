import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneralModule } from './mongodb/all.module';
import { DatabaseService } from './mongodb/services/database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
    ), // meter en un .env
    GeneralModule,
    AuthModule
  ],
  providers: [DatabaseService],
})
export class AppModule {}
