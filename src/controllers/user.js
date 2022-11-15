const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {user} = require('../models')

exports.register = async (req, res, next) => {
    try {
        const {firstName, lastName, username, email, password} = req.body
        console.log(req.body)

        const hashedPassword = bcrypt.hashSync(password, 8)
        
        let insertUser = await user.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword
        })

        return res.status(200).send({
            message: 'register sukses',
            data: insertUser
        })

    } catch (error) {
        return res.status(500).send({
            message: error.error,
            code: 500
        })
    }
}

exports.readAll = async (req, res, next) => {
    try {
        const data = await user.findAll()

        return res.status(200).send({
            message: `mengambil data sukses`,
            data: data
        })
    } catch (error) {
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}

exports.readme = async (req, res, next) => {
    try {
        const id = req.params.id

        const data = await user.findOne({
            where: {id: id}
        })

        if (!data) {
            return res.status(404).send({
                message: `data tidak ditemukan`
            })
        }

        return res.status(200).send({
            message: `mengambil data sukses`,
            data: data
        })
    } catch {
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id
        const {firstName, lastName, email} = req.body
        
        const updateData = await user.update({
            firstName: firstName,
            lastName: lastName,
            email: email
        }, {where: {id: id}})

        

        res.status(201).send({
            message: `data telah diupdate`,
            result: updateData
        })
    } catch (error) {
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id

        const dataUser = await user.findOne({
            where: {id: id}
        })

        if (!dataUser) {
            return res.status(404).send({
                message: `data tidak ditemukan, tidak bisa menghapus data user`
            })
        }
        
        const deletedUser = await user.destroy({
            where: {id: id}
        })

        return res.status(200).send({
            message: `data sudah dihapus`
        })

    } catch (error) {
        return res.status(500).send({
            message: error,
            code: 500
        })
    }
}