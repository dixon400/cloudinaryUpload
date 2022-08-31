const fs = require('fs')
const { unlink } = require("fs/promises");
const db = require("../../database");
const Uploader = require("../helper/uploader");
exports.postFiles = async (req, res) => {
  try {
      console.log(req.files[0]);
      let files = []
    await fs.readdirSync("images").forEach(name =>{
        console.log(name)
        files.push('images/' + name)
    })
    console.log({files});
    if (!req.files) {
      res.status(400).json({ error: "please upload a file" });
    }
    //let files = req.files;

    let result = [];
    let imageUrls = Promise.all(
      files.map(async (file) => {
        return new Uploader()
          .upload(file)
          .then((resp) => {
              console.log({resp});
              const query = 'insert into images (public_id, tag, format, image_url, original_filename) values (?,?,?,?,?)'
              const params = [resp.public_id, resp.tag, resp.format, resp.url, resp.original_filename]
              db.all(query, params, )
            // unlink(file.path);
            return resp;
          })
          .catch((e) => {
            return e;
          });
      })
    );

    let images = await imageUrls
      .then((resp) => {
        console.log({ resp });
      })
      .catch((e) => {
        return e;
      });
    console.log({ images });
    return res.status(200).json({
      message: "success",
      data: images,
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

exports.getFileData = async (req, res) => {
  try {
    const fs = require("fs");
    const csvFile = "ImageData" + Date.now() + ".csv";
    console.log({ csvFile });
    const query = "select * from images";
    db.all(query, async (err, data) => {
      console.log({ data });
      if (err) {
        console.log({ err });
        res.status(400).json({ error: err.message });
      }
      await fs.writeFile(csvFile, data, (err) => {
        if (err) {
          console.log({ err });
          throw err;
        }
        res.json({
          message: "success",
          data,
        });
      });
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
