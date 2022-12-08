import muiltipleImage from "../modal/muiltipleImages.js";
export const getUsers = async (req, res, next) => {
  try {
    const users = await muiltipleImage.find();
  } catch (error) {
    responce.status(404).json({ message: error.message });
    next(error);
  }
};

export const getuserPaginations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    console.log("page:", page);
    // get total documents in the Posts collection
    const count = await muiltipleImage.countDocuments();
    console.log("count:", count);
    const users = await muiltipleImage
      .find()
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    /////////////send response//////////
    console.log("users:", users);
    res.json({
      data: users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log("error paginations");
    next(error);
  }
};
