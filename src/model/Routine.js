
var objectId = require('mongodb').ObjectId;
const fs = require('fs');

class Routine {

    static userVerify(id, Module){
        const userId = objectId(id);

        return new Promise( async (resolve, reject) => {
            try {
                const user = await Module.findById(userId);
                if(!user) return reject({status: 400, message: 'User does not exist'});
                
                return resolve(user)

            } catch(err) {
                return reject({status: 400, message: '' + err});
            }
        });

    };

    static userPermission(user, perCat, perType){
        return new Promise((resolve, reject) => {
            if(!user.permissions[perCat][perType]) {
                return reject({status: 403, message: `Access denied, user don't have permissions to ${perType}`})
            }

            return resolve(true)
        });
    };

    static bodyValidation(validation, body){
        const { error }  = validation(body);

        return new Promise((resolve, reject) => {
            if( error ) return reject({status: 400, message: error.details.message});

            return resolve(true)
        });
    };

    static findById(id, Module) {
        const moduleId = objectId(id);

        return new Promise( async (resolve, reject) => {
            try {
                const data = await Module.findById(moduleId);
                return resolve(data);

            } catch(err) {
                return reject({status: 400, message: 'Something went wrong: ' + err});
            }
        });
    };

    static findAll(Module) {

        return new Promise( async (resolve, reject) => {
            try {
                const data = await Module.find({});
                resolve(data);

            } catch(err) {
                reject({status: 400, message: 'Something went wrong: ' + err});
            }
        });
    };

    static find(Module, prop, value) {

        return new Promise( async (resolve, reject) => {
            try {
                const data = await Module.find({ [prop]: value});
                return resolve(data);

            } catch(err) {
                return reject({status: 400, message: 'Something went wrong: ' + err});
            }
        });
    };

    static saveNewDocument(doc) {
        
        return new Promise( async (resolve, reject) => {
            try {
                await doc.save();
                resolve()
            } catch(err) {
                return reject({status: 400, message: 'Something went wrong: ' + err});
            }
        })
    }

    static updateOne(id, Module, newData){
        const moduleId = objectId(id);

        return new Promise( async (resolve, reject) => {
            try {
                const status = await Module.updateOne({_id: moduleId}, {$set: newData});
                
                return resolve(status)

            } catch(err) {
                return reject({status: 400, message: 'Something went wrong: ' + err});
            }
        });
    };

    static deleteImagePath(path) {
        try {
            fs.unlinkSync(path)
            return true
            //file removed
        } catch(err) {
            //Create error log reporting
            console.log(err)
            return false
        }
    }

}

module.exports = Routine;