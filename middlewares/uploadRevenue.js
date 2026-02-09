const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
//   params: (req, file) => {

//         const isImage = file.mimetype.startsWith("image/");

// return{




//     folder: "fund-tracker/revenue",
//         resource_type: "auto",   // ✅ ADD THIS ONLY


//     allowed_formats: ["jpg", "jpeg", "png", "pdf", "webp","xlsx","xls","csv"],
      
      

//     // transformation: [
//     //   { width: 1000, height: 1000, crop: "limit" },
//     //   { quality: "auto", fetch_format: "auto" }
//     // ],

//      ...(isImage && {
//         transformation: [
//           { width: 1000, height: 1000, crop: "limit" },
//           { quality: "auto", fetch_format: "auto" },
//         ],
//       }),


//     // public_id: (req, file) => {
//     //   return (
//     //     "revenue_" +
//     //     Date.now() +
//     //     "_" +
//     //     Math.round(Math.random() * 1e9)
//     //   );
      
//     // },

//   public_id:
//         "revenue_" +
//         Date.now() +
//         "_" +
//         Math.round(Math.random() * 1e9),

//   }
//   },

// ------------------------------

// params: (req, file) => {
//   const isImage = file.mimetype.startsWith("image/");

//   return {
//     folder: "fund-tracker/revenue",
//     resource_type: "auto",

//     // allowed_formats: isImage
//     //   ? ["jpg", "jpeg", "png", "webp"]
//     //   : ["pdf", "xlsx", "xls", "csv"],

//       allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],


//     ...(isImage && {
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//     }),

//     public_id:
//       "revenue_" +
//       Date.now() +
//       "_" +
//       Math.round(Math.random() * 1e9),
//   };
// },


// ----------------------

// params: (req, file) => {
//   const isImage = file.mimetype.startsWith("image/");

//   return {
//     folder: "fund-tracker/revenue",
//     resource_type: "auto",

//     // allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],

//     ...(isImage && {
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//     }),

//     public_id:
//       "revenue_" +
//       Date.now() +
//       "_" +
//       Math.round(Math.random() * 1e9),
//   };
// },
// ------------------------------
// params: (req, file) => {
//   const isImage = file.mimetype.startsWith("image/");

//   return {
//     folder: "fund-tracker/revenue",
//     resource_type: "auto",

//     ...(isImage && {
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//     }),

//     public_id:
//       "revenue_" +
//       Date.now() +
//       "_" +
//       Math.round(Math.random() * 1e9),
//   };
// },

// --------------------
// params: (req, file) => {
//   const isImage = file.mimetype.startsWith("image/");

//   return {
//     folder: "fund-tracker/revenue",

//     // ✅ IMPORTANT
//     resource_type: isImage ? "image" : "raw",

//     ...(isImage && {
//       transformation: [
//         { width: 1000, height: 1000, crop: "limit" },
//         { quality: "auto", fetch_format: "auto" },
//       ],
//     }),

//     public_id:
//       "revenue_" +
//       Date.now() +
//       "_" +
//       Math.round(Math.random() * 1e9),
//   };
// },

// -------------------------------


params: (req, file) => {
  const isImage = file.mimetype.startsWith("image/");

  const originalExt = file.originalname.split(".").pop();

  return {
    folder: "fund-tracker/revenue",
    resource_type: isImage ? "image" : "raw",

    ...(isImage && {
      transformation: [
        { width: 1000, height: 1000, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
    }),

    // ✅ EXTENSION ADD
    public_id:
      "revenue_" +
      Date.now() +
      "_" +
      Math.round(Math.random() * 1e9) +
      "." +
      originalExt,
  };
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
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
    "application/vnd.ms-excel", // xls
    "text/csv", // csv
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only pdf / jpg / jpeg / png / webp / xlsx / xls / csv allowed ❌"), false);
  }
  
};

const uploadRevenue = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}
);

module.exports = uploadRevenue;
