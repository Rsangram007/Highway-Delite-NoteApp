import mongoose from "mongoose";

interface NoteDocument extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
}

const noteSchema = new mongoose.Schema<NoteDocument>({
  userId: mongoose.Types.ObjectId,
  content: String,
});

const Note: mongoose.Model<NoteDocument> = mongoose.model("Note", noteSchema);
export default Note;
