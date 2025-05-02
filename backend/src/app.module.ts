import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuarios/usuarios.module';
import { DatabaseService } from './usuarios/services/database.service';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://oscarhaotianceb:20041125oscar@cluster0.ag9u1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // meter en un .env
        UsuarioModule,
    ],
    providers: [DatabaseService],
})
export class AppModule {}
