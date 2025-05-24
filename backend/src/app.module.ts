import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneralModule } from './usuarios/usuarios.module';
import { DatabaseService } from './usuarios/services/database.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rodrigopratceb:WYNCD4fwZ8sW0UcJ@cluster0.tfm5roc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ), // meter en un .env
    GeneralModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
