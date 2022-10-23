import Variant from "../../../models/variant"
import VariantOption from '../../../models/variant_option'
import connectDb from "../../../utils/connectDb"

export default async function createVariant(req,res){
    await connectDb()

    const body = JSON.parse(JSON.stringify(req.body))

    var voptions = []

    const result = await Variant.create({
      name: body.name,
      displayName: body.displayName,
      selectOption: body.selectOption
    })

    await Promise.all(body.options.map(async (option) => {
      var variantOption = await VariantOption.create({variant_id: result._id, name: option.value})
        voptions.push(variantOption._id)
    })).then(async () => {
      result.options = voptions
      console.log(voptions)
      await result.save()
      console.log(result)
    })

    return res.status(200).json(result)
}