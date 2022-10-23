import connectDb from '../../utils/connectDb'
import Delivery from '../../models/delivery'

export default async function devSeed(){
    await connectDb()

    /*Delivery.create(
        {
            name: 'InPost',
            img: 'inpost.svg',
            price: 9.99,
            freeFrom: 100,
            cod: false,
            active: true
        })
    Delivery.create(    
        {
            name: 'DPD',
            img: 'dpd.svg',
            price: 12.99,
            freeFrom: 179,
            cod: false,
            active: true
        })
    Delivery.create(
        {
            name: 'DHL',
            img: 'dhl.svg',
            price: 12.99,
            freeFrom: 179,
            cod: false,
            active: true
        })*/
}