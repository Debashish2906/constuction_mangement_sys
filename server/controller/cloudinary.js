const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name:'djjfv1lmv',
  api_key:'385459217589942',
  api_secret:'YK7Lpx9vaHuD86Rm0wIjf_JzNFw',
});
exports.upload = async (req, res) => {
  
  const { file } = req.files;
  try {
    const img = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    res.json({
      status: 0,
      public_id: img.public_id,
      url: img.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.json({
        status:1,
        message:err
    })
  }
};

exports.remove = async (req, res) => {
  let image_id = req.body.public_id;
  await cloudinary.v2.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ sucess: false, err });
    res.send("ok");
  });
};
