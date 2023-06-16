const express = require('express')
const router = express.Router()
const Sepatu = require('../models/Sepatu')

function result(succ, msg, details) {
    if (details) {
        return {
            success: succ,
            message: msg,
            data: details
        }
    } else {
        return {
            success: succ,
            message: msg,
        }
    }

}
router.get('/', async (req, res) => {
    try {
        const sepatu = await Sepatu.aggregate([{
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            {
                $set: {
                    id: '$_id',
                    username: {
                        $arrayElemAt: ['$userData.username', 0]
                    }

                }

            },
            {
                $project: {
                    userData: 0,
                    _id: 0
                }
            }

        ]);
        if (sepatu.length > 0) {
            res.status(200).json(result(1, 'Retrieve Data Success', sepatu))
        } else {
            res.status(404).json(result(0, 'Zero Data!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.post('/', async (req, res) => {
    const inputSepatu = new Sepatu({
        NamaMerekSepatu: req.body.NamaMerekSepatu,
        ModelSepatu: req.body.ModelSepatu,
        JenisSepatu: req.body.JenisSepatu,
        WarnaSepatu: req.body.WarnaSepatu,
        UkuranSepatu: req.body.UkuranSepatu,
        JumlahSepatu: req.body.JumlahSepatu,
        HargaPerPcsSepatu: req.body.HargaPerPcsSepatu,
        user_id: req.body.user_id
    })
    try {
        const sepatu = await inputSepatu.save()
        res.status(200).json(result(1, 'Insert  Successful'))

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})

router.put('/', async (req, res) => {
    const data = {
        id: req.body.id,
        NamaMerekSepatu: req.body.NamaMerekSepatu,
        ModelSepatu: req.body.ModelSepatu,
        JenisSepatu: req.body.JenisSepatu,
        WarnaSepatu: req.body.WarnaSepatu,
        UkuranSepatu: req.body.UkuranSepatu,
        JumlahSepatu: req.body.JumlahSepatu,
        HargaPerPcsSepatu: req.body.HargaPerPcsSepatu
    }
    try {
        const sepatu = await Sepatu.updateOne({
            _id: data.id,
        }, data)

        if (sepatu.matchedCount > 0) {
            res.status(200).json(result(1, 'Updated  Success!'))
        } else {
            res.status(200).json(result(1, 'Updated  Failed!'))
        }

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const sepatu = await Sepatu.deleteOne({
            _id: req.params.id
        })
        if (sepatu.deletedCount > 0) {
            res.status(200).json(result(1, 'Deleted Success!'))
        } else {
            res.status(200).json(result(0, 'Deleted Failed!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }

})
module.exports = router