import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
    console.log("in the multer middleware");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    console.log(file.originalname);
  },
});

export const upload = multer({
  storage,
});
