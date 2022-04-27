import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Member } from './signup.model';
import { SignupsService } from './signups.service';

@Controller('signups')
export class SignupsController {
  constructor(private signupsService: SignupsService) {}

  @Post()
  async addSignup(
    @Body('teamName') teamName: string,
    @Body('teamCaptain') teamCaptain: string,
    @Body('members') members: Member[],
  ) {
    const generatedId = await this.signupsService.insertSignup(
      teamName,
      teamCaptain,
      members,
    );
    return { signupId: generatedId };
  }

  @Get()
  async getAllSignups() {
    const signups = await this.signupsService.getSignups();
    return signups;
  }

  @Get(':id')
  getSignup(@Param('id') signupId: string) {
    return this.signupsService.getSingleSignup(signupId);
  }

  @Patch(':id')
  async updateSignup(
    @Param('id') signupId: string,
    @Body('teamName') teamName: string,
    @Body('teamCaptain') teamCaptain: string,
    @Body('members') members: Member[],
  ) {
    await this.signupsService.updateSignup(
      signupId,
      teamName,
      teamCaptain,
      members,
    );
    return 'Signup Information Updated!';
  }

  @Delete(':id')
  async removeSignup(@Param('id') signupId: string) {
    await this.signupsService.deleteSignup(signupId);
    return 'Signup Information Deleted!';
  }
}
