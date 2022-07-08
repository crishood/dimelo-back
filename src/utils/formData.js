const Busboy = require("busboy");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

formData = (req, res, next) => {
  let uploadingFile = false;

  const done = () => {
    if (uploadingFile) return;
    next();
  };

  const bb = Busboy({ headers: req.headers });
  req.body = {};

  //Captura partes que no son un archivo
  bb.on("field", (key, val) => {
    req.body[key] = val;
  });

  //Captura partes que si son un archivo
  bb.on("file", (key, stream) => {
    uploadingFile = true;
    const cloud = cloudinary.uploader.upload_stream(
      { upload_preset: "media_dimelo" },
      (err, res) => {
        if (err) throw new Error("Something went wrong!");

        req.body[key] = res.secure_url;
        uploadingFile = false;
        done();
      }
    );

    stream.on("data", (data) => {
      cloud.write(data);
    });

    stream.on("end", () => {
      cloud.end();
    });
  });

  bb.on("finish", () => {
    done();
  });

  req.pipe(bb);
};

module.exports = formData;
