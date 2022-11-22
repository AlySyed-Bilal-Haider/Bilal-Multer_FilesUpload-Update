
import muiltipleImage from "../modal/muiltipleImages.js";
export const getUsers = async (req, res, next) => {
  try {
    const users = await muiltipleImage.find().select("-password");

    res.json({ data: users });
  } catch (error) {
    responce.status(404).json({ message: error.message });
    next(error);
  }
};
