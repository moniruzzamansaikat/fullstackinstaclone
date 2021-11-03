const cloudinary = require("./cloudinary");
const streamifier = require("streamifier");

/**
 * Upload single file
 * @param {File} file
 */
exports.uploadSingle = async function (file) {
  return await streamUpload(file);
};

/**
 * Delete images from cloudinary - by publicId's()
 * @param {Array<string>} publicIds
 */
exports.deleteFiles = async (publicIds, cb) => {
  await Promise.all(publicIds.map((id) => deleteFromCloudinary(id))).then(
    (done) => {
      cb(null, true);
    }
  );
};

// upload files to cloudinary
exports.uploadFiles = (fileObj, cb) => {
  const fileArray = [];

  // make file obj to arrays
  Object.keys(fileObj).forEach((key) => {
    fileArray.push(fileObj[key]);
  });

  Promise.all(fileArray.map((file) => streamUpload(file))).then((res) => {
    cb(null, res);
  });
};

// cloudinary stream uploader
let streamUpload = (file) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve({ publicId: result.public_id, url: result.secure_url });
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(file.data).pipe(stream);
  });
};

/**
 * @param {string} publicId
 */
let deleteFromCloudinary = async (publicId) => {
  const done = await cloudinary.uploader.destroy(publicId);
  return done;
};
