import * as mongoose from 'mongoose';

export const SignupSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
    teamCaptain: {
      type: String,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
    members: {
      type: Object,
      required: true,
    },
  },
  { versionKey: false },
);

export interface Signup extends mongoose.Document {
  id: string;
  teamName: string;
  teamCaptain: string;
  members: Member[];
}

export class Member {
  constructor(
    public fbName: string,
    public mlId: number,
    public mlName: string,
  ) {}
}
