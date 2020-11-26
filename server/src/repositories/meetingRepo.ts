import mongoose from 'mongoose';

const dbUri = process.env.DATABASE_URI;
if (!dbUri) throw new Error('No DB URI');

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const meetingSchema = new mongoose.Schema({
  link: String,
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export const getLink = async (): Promise<string | null> => {
  const meetings = await Meeting.find();
  if (meetings.length === 0) return null;
  // @ts-ignore
  return meetings[0].link;
};

export const setLink = async (link: string): Promise<void> => {
  const meetings = await Meeting.find();
  if (meetings.length === 0) {
    await Meeting.create({ link });
  } else {
    const meeting = meetings[0];
    await meeting.updateOne({ link });
  }
};
