import {IncomingForm} from 'formidable'
import Product from '../../../models/product'
import fs, { rename } from 'fs'

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

export default async function EditProduct(req, res){
  const form = new IncomingForm(options)

  form.parse(req, async (err, fields, files) => {

    const product = await Product.findOne({slug: fields.id})

    product.name = fields.name
    product.description = fields.description
    product.producer = fields.manufacturer
    product.category = fields.category
    product.subcategory = fields.subcategory
    product.new_badge = fields.new_badge
    product.active = fields.active

    await product.save()

    /// uploading photos

    //getting current photos from db
    var originalPhotos = []
    originalPhotos.push(product.main_photo)
    originalPhotos = originalPhotos.concat(...product.photos)

    //parse photos received from user 
    let photos = []
    let alreadyUploaded = []
    let notUploaded = []

    let temp
    temp = [fields.photos].flat()

    temp.map((photo, index) => {
        photos.push(JSON.parse(photo))
        if(photos[index].uploaded) alreadyUploaded.push(photos[index].name)
    })

    if(files.photos){
        if(!files.photos.length){
            //single file
            notUploaded.push(files.photos.newFilename)
        }
        else{
            //multiple files
            for(let i=0; i < files.photos.length; i++){
                notUploaded.push(files.photos[i].newFilename)
            }
        }
    }

    //remove files
    let difference = originalPhotos.filter(x => !alreadyUploaded.includes(x));

    if(difference){
        difference.forEach(diff => {
            try{
                fs.unlinkSync(uploadDir + '/' + diff)
            }
            catch(err){
                console.log("no file")
            }
        })
    }

    alreadyUploaded.forEach((photo, index ) => {
        try{
            let extension = photo.split('.').pop();
            let newFileName = fields.id + '-' + (originalPhotos.length + 1 + index) + "." + extension
            alreadyUploaded[index] = newFileName
            fs.renameSync(uploadDir + '/' + photo, uploadDir + '/' + newFileName)
        }
        catch(err){
            console.log("no file")
        }
    })

    let uploadedIndex = 0, notUploadedIndex = 0
    let finalPhotos = []

    photos.map(item => {
        if(item.uploaded){
            finalPhotos.push(alreadyUploaded[uploadedIndex])
            uploadedIndex++
        }
        else{
            finalPhotos.push(notUploaded[notUploadedIndex])
            notUploadedIndex++
        }
    })

    let renamedPhotos = []
    let ext, newName

    finalPhotos.forEach((photo, index) => {
        ext = photo.split('.').pop();
        newName = product.slug + '-' + (index+1) + "." + ext

        try{
            fs.renameSync(uploadDir + '/' + photo, uploadDir + '/' + newName)
            renamedPhotos.push(newName)
        }
        catch(err){
            console.log("no file")
        }
    })

    product.main_photo = renamedPhotos[0] || ''
    product.photos = renamedPhotos.slice(1)

    await product.save()

    return res.status(200).json(product)
  })
}