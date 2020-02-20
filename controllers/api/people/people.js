const peopleRepo = require('../../../lib/people-repository');

class PeopleController {

    constructor(router) {

        router.post("/", this.addPerson.bind(this));
        router.delete("/:id", this.deletePerson.bind(this));
        router.put("/:id", this.updatePerson.bind(this));
        router.get("/search", this.searchPersonByEmail.bind(this));
    }

    deletePerson(req, res, next) { //dar de baja
        
        let personId = req.params.id;
        peopleRepo.deletePerson(personId, (err, succeded) => {
            if (err) return next(err); 
            res.json({succeded});
        })

    }


    updatePerson(req, res, next) { //actualizar datos de persona
        let personId = req.params.id;
        let data = req.body;
        peopleRepo.updatePerson(personId, data, (err, succeded) => {
            if (err) return next(err); 
            res.json({succeded});
        })

    }

    
    addPerson(req, res, next) { //añadir datos de persona
        let body = req.body;
        peopleRepo.addPerson(body, (err, person) => {
            if (err) return next(err); 
            res.json(person);
        })
    }

    searchPersonByEmail(req, res, next) { //buscar personas por email
        let searchInput = req.query.searchInput;
        peopleRepo.searchPersonByEmail(searchInput, (err, people) => {
            if (err) return next(err); 
            res.json(people);
        })

    }

   
}

module.exports = PeopleController;