const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fund-tracker/revenue",

    allowed_formats: ["jpg", "jpeg", "png", "pdf", "webp"],

    transformation: [
      { width: 1000, height: 1000, crop: "limit" },
      { quality: "auto", fetch_format: "auto" }
    ],

    public_id: (req, file) => {
      return (
        "revenue_" +
        Date.now() +
        "_" +
        Math.round(Math.random() * 1e9)
      );
    },
  },
});

// Only allowed files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only pdf / jpg / jpeg / png allowed ❌"), false);
  }
};

const uploadRevenue = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = uploadRevenue;
