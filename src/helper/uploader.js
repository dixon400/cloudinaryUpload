"use strict";

const cloudinary = require("cloudinary").v2;
const { config } = require("../../config");
cloudinary.config(config.cloudinary);

class Uploader {
  /**
   * Upload file buffer to Cloudinary
   * @param {Buffer} file
   */
  async upload(file) {
    return new Promise(async (resolve) => {
      return cloudinary.uploader
          .upload(
              file,
              { folder: "Health", public_id: file },
              (err, res) => {
                  if (err) {
                      console.log("cloudinary error", err);
                      throw err;
                  }
                  resolve(res);
              }
          )
    });
  }

  /**
   * Delete files from Cloudinary.
   * Expects an array of public_ids
   * @param {<array>} files
   */
  async delete(files) {
    return new Promise(async (resolve, reject) => {
      return files.map(async (public_id) => {
        return await cloudinary.api.delete_resources(
          public_id,
          {},
          async (err, res) => {
            if (err) {
              console.log("cloudinary error", err);
              reject({ status: false });
            }
            resolve(res);
          }
        );
      });
    });
  }
}

module.exports = Uploader;
