import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneralModule } from './mongodb/all.module';
import { DatabaseService } from './mongodb/services/database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://oscarhaotianceb:20041125oscar@cluster0.ag9u1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ), // meter en un .env
    GeneralModule,
    AuthModule
  ],
  providers: [DatabaseService],
})
export class AppModule {}
