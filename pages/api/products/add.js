import {IncomingForm} from 'formidable'
import Product from '../../../models/product'
import ProductItem from '../../../models/product_item'
import Variant from '../../../models/variant'
import fs from 'fs'
import connect from '../../../utils/connectDb'

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = "./public/img/products"

const options = {
  uploadDir: uploadDir,
  multiples: true,
  keepExtensions: true,
  maxFileSize: 200 * 1024 * 1024,
  filename: (name, ext, part, form)=>{
    return name + Date.now() + ext
  }
}

export default async function Upload(req, res){
  const form = new IncomingForm(options)

  form.parse(req, async (err, fields, files) => {
    if(err) return res.status(503).send(err)

    var main_photo = ''
    var photos = []

    if(!files.photos.length){
      //single file
      main_photo = files.photos.newFilename
    }
    else{
      //multiple files
      main_photo = files.photos[0].newFilename

      for(let i=1; i < files.photos.length; i++){
        photos.push(files.photos[i].newFilename)
      }
    }

    await connect()
    const variant = await Variant.find({_id: fields.variant})

    Product.create({
      name: fields.name,
      description: fields.description,
      producer: fields.manufacturer,
      category: fields.category,
      subcategory: fields.subcategory,
      main_photo: main_photo,
      photos: photos,
      new_badge: fields.new_badge,
      active: fields.active,
    }).then(async (product) => {

      var ext, newName, renamedPhotos = []

      if(product.main_photo){
        ext = product.main_photo.split('.').pop();
        newName = product.slug + "." +ext
        fs.renameSync(uploadDir + '/' + product.main_photo, uploadDir + '/' + newName)
        product.main_photo = newName
      }

      product.photos.forEach((photo, index) => {
        ext = photo.split('.').pop();
        newName = product.slug + '-' + (index+1) + "." + ext
        renamedPhotos.push(newName)
        fs.renameSync(uploadDir + '/' + photo, uploadDir + '/' + newName)
      })

      product.photos = renamedPhotos

      if(variant){
        var temp = []
        variant.map(item => {
          temp.push(item._id)
        })
        product.variant = temp

        var variants = []

        //todo // combine each variant option with each
        variant[0].options.map(option => {
          variants.push(option._id)
        })

        variants.map(async (variantItem) => {
          await ProductItem.create({
            product_id: product._id,
            options: variantItem
          })
        })
      }
      else{
        await ProductItem.create({
          product_id: product._id
        })
      }

      await product.save()

      return res.status(200).json({product})
    }).catch(err => {
      return res.status(503).send(err)
    })
  })
}