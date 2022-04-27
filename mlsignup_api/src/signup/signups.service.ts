import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, Signup } from './signup.model';
import { Model } from 'mongoose';

@Injectable()
export class SignupsService {
  constructor(
    @InjectModel('Signup') private readonly signupModel: Model<Signup>,
  ) {}

  async insertSignup(teamName: string, teamCaptain: string, members: Member[]) {
    const newSignup = new this.signupModel({
      teamName,
      teamCaptain,
      members,
    });
    const result = await newSignup.save();
    console.log(result);
    return result.id as string;
  }

  async getSignups() {
    const signups = await this.signupModel.find().exec();
    return signups.map((su) => ({
      id: su.id,
      teamName: su.teamName,
      teamCaptain: su.teamCaptain,
      members: su.members,
    }));
  }

  async findSignup(id: string): Promise<Signup> {
    let signup;
    try {
      signup = await this.signupModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Signup ID not found.');
    }

    if (!signup) {
      throw new NotFoundException('Signup ID not found.');
    }
    return signup;
  }

  async getSingleSignup(signupId: string) {
    const signup = await this.findSignup(signupId);
    return {
      id: signup.id,
      teamName: signup.teamName,
      teamCaptain: signup.teamCaptain,
      members: signup.members,
    };
  }

  async updateSignup(
    signupId: string,
    teamName: string,
    teamCaptain: string,
    members: Member[],
  ) {
    const updatedSignup = await this.findSignup(signupId);

    if (teamName) {
      updatedSignup.teamName = teamName;
    }
    if (teamCaptain) {
      updatedSignup.teamCaptain = teamCaptain;
    }
    if (members) {
      updatedSignup.members = members;
    }
    updatedSignup.save();
  }

  async deleteSignup(signupId: string) {
    const deletedSignup = await this.signupModel
      .deleteOne({ _id: signupId })
      .exec();
    console.log(deletedSignup);
    if (deletedSignup.deletedCount === 0) {
      throw new NotFoundException('Could not find signupID');
    }
  }
}
