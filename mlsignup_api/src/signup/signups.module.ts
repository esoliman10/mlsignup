import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupSchema } from './signup.model';
import { SignupsController } from './signups.controller';
import { SignupsService } from './signups.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Signup', schema: SignupSchema }]),
  ],
  controllers: [SignupsController],
  providers: [SignupsService],
})
export class SignupsModule {}
