var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({

    first_name: {type: String}, 
    last_name: {type: String},
    full_name: {type: String},
    phone: {type: String},
    date_of_birth: {type: Date},
    emails: [{ 
		email: { type: String },
		priority: { type: Number, default: 1 }
	}]

},{
    timestamps: true 
});

/* Hook que se ejecuta cada vez que este documento de guarda para determinar 
el nombre completo de la persona en cuestión
*/

PersonSchema.pre('save', function(next) {
    this.full_name = this.first_name + " " + this.last_name; //this se refiere el documento
    next();
})


var Person = mongoose.model('Person', PersonSchema);
module.exports = Person;