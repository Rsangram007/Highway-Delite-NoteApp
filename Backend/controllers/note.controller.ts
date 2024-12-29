import Note from "../models/note.model";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  user?: { userId: string };
}
export const Notes = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.userId;
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createnote = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  const { content } = req.body;

  try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
    let user = req.user.userId;
    const note = new Note({ userId: user, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const Deletenote = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
    let user = req.user.userId;
    const note = await Note.findOneAndDelete({
      _id: id,
      userId: user,
    });
    if (!note)
      return res.status(404).json({ error: "Note not found or unauthorized" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
