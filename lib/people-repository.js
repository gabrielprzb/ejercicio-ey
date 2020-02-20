const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = mongoose.Types.ObjectId,
	Person = require('../models/person');

class PeopleRepository {

	addPerson(body, callback) {
		let { first_name, last_name, date_of_birth, phone, emails } = body;
		let person = {
			first_name,
			last_name,
			date_of_birth,
			phone,
			emails
		}
		Person.create(person).then((person) => {
			callback(null, person)
		}).catch((err) => {
			callback(err);
		})

	}

	updatePerson(personId, data, callback) {
	
		Person.updateOne({ _id: ObjectId(personId) }, { $set: data })
			.then(person => {
				callback(null, true)
			}).catch(err => {
				callback(err);
			})

	}

	deletePerson(personId, callback) {
		Person.deleteOne({ _id: ObjectId(personId) })
			.then(action => {
				callback(null, true)
			}).catch(err => {
				callback(err)
			})
	}
	

	
	searchPersonByEmail(searchInput, callback) {

		/* Se utliza una expresión regular ya que el endpoint se llama cada vez que el cliente deja de escribir, 
		por lo que no necesariamente tiene que escribir todo el email, se pueden tomar términos parciales */

		var regexp = new RegExp("^" + searchInput); //Expresión regular que busca valores que empiezen con el valor de la variable "searchInput"
		Person.find({ "emails.email": regexp })
			.sort({ full_name: 1 })
			.then(people => {
				callback(null, people)
			}).catch((err) => {
				callback(err);
			})

	}

}

module.exports = new PeopleRepository();