const { body, validationResult, check } = require('express-validator');

// Models
const PostPicture = require('../models/post.model');
const PostManual = require('../models/post_manual.model');

// Validation For Post
postCreateValidationRules = () => {
  return [
    
    check('body', 'Body Tidak Valid').isString(),

    // Custom Validation
    body('title').custom(async (value, { req }) => {

        // Cek Duplikatnya
        const duplicate = await PostPicture.findOne({ title: value });

        // If there is a duplicate
        if(duplicate){
            throw new Error('Judul Postingan Sudah ada')
        }            

        return true;

    })
  ]
}

postUpdateValidationRules = () => {
  return [
    
    check('body', 'Body Tidak Valid').isString(),

    // Custom Validation
    body('title').custom(async (value, { req }) => {

      // Cek Duplikatnya
      const duplicate = await PostPicture.find({ title: value });
      // If there is a duplicate
      if(duplicate != 0){
          if(duplicate.length == 1) {
              if(duplicate[0]._id != req.params._id) {
                  throw new Error('Title Sudah adaa')
              }
          }else{
              throw new Error('Title Sudah ada')
          }            
      }       

        return true;

    })
  ]
}

// Validation For Post Manual
postManualCreateValidationRules = () => {
  return [
    
    check('body', 'Body Tidak Valid').isString(),

    // Custom Validation
    body('title').custom(async (value, { req }) => {

        // Cek Duplikatnya
        const duplicate = await PostManual.findOne({ title: value });

        // If there is a duplicate
        if(duplicate){
            throw new Error('Judul Postingan Sudah ada')
        }            

        return true;

    })
  ]
}

postManualUpdateValidationRules = () => {
  return [
    
    check('body', 'Body Tidak Valid').isString(),

    // Custom Validation
    body('title').custom(async (value, { req }) => {

      // Cek Duplikatnya
      const duplicate = await PostManual.find({ title: value });
      // If there is a duplicate
      if(duplicate != 0){
          if(duplicate.length == 1) {
              if(duplicate[0]._id != req.params._id) {
                  throw new Error('Title Sudah adaa')
              }
          }else{
              throw new Error('Title Sudah ada')
          }            
      }       

        return true;

    })
  ]
}

// Sending Error (Whether Error exist or not)
validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return next()
}

// Exporting modules
module.exports = {
  postCreateValidationRules,
  postUpdateValidationRules,
  postManualCreateValidationRules,
  postManualUpdateValidationRules,
  validate
}