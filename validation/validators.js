const Validators = require('validator');
const isEmpty = require('is-empty');

module.exports.loginValidator = loginValidator = function validateLoginInput(data){
    const errors = {}
    data.users_email = !(isEmpty(data.users_email)) ? data.users_email:"";
    data.users_password = !(isEmpty(data.users_password)) ? data.users_password:"";

    if(Validators.isEmpty(data.users_email)){
        errors.users_email = "Email is required. Can't be empty!"
    }
    if(!Validators.isEmail(data.users_email)){
        errors.users_email = "Email is invalid. Please provide valid email address!";
    }
    if(Validators.isEmpty(data.users_password)){
        errors.users_password = "Please provide passowrd!";
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
}

//users_email, users_name, users_password, users_sex, users_disease, users_drink, users_smoke, users_disease_array
module.exports.registerValidator = registerValidator= function validateRegisterInput(data){ 
    const errors = {}
    data.users_email = !(isEmpty(data.users_email)) ? data.users_email:"";
    data.users_name = !(isEmpty(data.users_name)) ? data.users_name : "";
    data.users_password = !isEmpty(data.users_password) ? data.users_password:"";
    data.users_sex = !isEmpty(data.users_sex) ? data.users_sex : "";
    data.users_disease = !isEmpty(data.users_disease) ? data.users_disease : "";
    data.users_drink = !isEmpty(data.users_drink) ? data.users_drink : "";
    data.users_smoke = !isEmpty(data.users_smoke) ? data.users_smoke : "";
    data.users_disease_array = !isEmpty(data.users_disease_array) ? data.users_disease_array : "";
    
    if(Validators.isEmpty(data.users_email)){
        errors.users_email = "Email is required. Can't be empty!"
    }
    if(!Validators.isEmail(data.users_email)){
        errors.users_email = "Email is invalid. Please provide valid email address!";
    }
    if(Validators.isEmpty(data.users_name)){
        errors.users_name = "Name is required. Can't be empty!"
    }
    if(Validators.isEmpty(data.users_password)){
        errors.users_password = "Please provide passowrd!";
    }
    if(Validators.isEmpty(data.users_sex)){
        errors.users_sex = "Please provide sex!";
    }
    if(Validators.isEmpty(data.users_disease)){
        errors.users_disease = "Please provide disease!";
    }
    if(Validators.isEmpty(data.users_drink)){
        errors.users_drink = "Please provide drink!";
    }
    if(Validators.isEmpty(data.users_smoke)){
        errors.users_smoke = "Please provide smoke!";
    }
    if(Validators.isEmpty(data.users_disease_array)){
        errors.users_disease_array = "Please provide disease array!";
    }
    
    return {
        errors:errors,
        isValid:isEmpty(errors)
    };
    
}