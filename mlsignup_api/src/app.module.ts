import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupsModule } from './signup/signups.module';

@Module({
  imports: [
    SignupsModule,
    MongooseModule.forRoot(
      'mongodb+srv://esoliman:Ece0055630@cluster0.u1eah.mongodb.net/mldatabase?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
