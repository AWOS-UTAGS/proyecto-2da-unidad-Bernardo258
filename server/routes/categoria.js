const express = require('express');
const _ = require('underscore');
const app = express;
const Categoria = require('../models/categoria');

app.length('/categoria', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Categoria.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al lista las categorias',
                    err: err
                });
            }
            res.json({
                ok: true,
                msg: 'Categorias listadas con exito',
                conteo: categorias.length,
                categorias
            })
        })
});

app.post('/categoria', (req, res) => {
    let cat = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.body.usuario
    });

    cat.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar una categoría',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Categoría insertada con éxito',
            catDB
        })
    });
});

app.put("/categoria/:id", function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'usuario']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrió un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario actualizado con éxito',
            categoria: catDB
        });
    });
});

app.delete('/categoria/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, { context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrió un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'La categoría ha si eliminada con éxito',
            catDB
        });
    });
})

module.exports = app;