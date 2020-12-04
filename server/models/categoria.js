const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Hacer una llave foranea
let categoriaSchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);