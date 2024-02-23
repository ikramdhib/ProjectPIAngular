export class Authenticationrequest{
    login: String;
    password: String;
    
    constructor(login: String, password: String){
        this.login = login;
        this.password = password;
    }
}