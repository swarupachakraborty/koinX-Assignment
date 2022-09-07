const { default: axios } = require("axios")
const ethPriceModel = require("../model/ethPrice.model")
const txnModel = require("../model/txn.model")

const userData = async (req, res) => {
    try {
        let address = req.query.address
        if (!address) return res.send({ status: false, message: 'address must be required!' })
        let data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&apikey=P7Z15AA8XTHJ1SMKYPVWUMJUEHXMBZ9NF7`)
        // console.log(data.data.result)
        if (!data.data.result) return res.send({ status: false, message: 'result not avalable!' })
        let txmDataSave = await txnModel.create({ address, transaction: data.data.result })
        res.send({ status: true, data: txmDataSave })
    } catch (error) {
        res.send({ message: error.message })
    }

}

const get_user_ballance = async (req, res) => {
    try {
        let address = req.query.address
        if (!address) return res.send({ status: false, message: 'address must be required!' })
        let data = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=P7Z15AA8XTHJ1SMKYPVWUMJUEHXMBZ9NF7`)
        // console.log(data.data.result)
        res.send({ status: true, data: data.data.result })
    } catch (error) {
        res.send({ message: error.message })
    }

}





const get_price = async (cripto = 'ethereum') => {
    try {
        let data = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=inr`)
        let response = await ethPriceModel.updateOne({
            name: cripto
        }, {
            $set: {
                name: cripto,
                price: data.data[cripto].inr || 0
            }
        }, {
            upsert: true
        });

        console.log(`🔃 updated ${cripto} ballance:`, data.data[cripto]?.inr || NaN)
    } catch (e) {
        console.log('⚠️ ', e.message)
    }
}


module.exports = { userData, get_price, get_user_ballance }