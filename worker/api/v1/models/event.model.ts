import * as Mongoose from "mongoose";

export interface IEvent extends Mongoose.Document {
  name: string;
  createdAt: Date;
  updateAt: Date;
}

export const EventSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  collection: 'Event',
  timestamps: true
});

export const EventModel = Mongoose.model<IEvent>('Event', EventSchema);
