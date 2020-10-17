export class Client {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    // description: string;

    constructor(userNameIn: string = "", firstNameIn: string = "", lastNameIn: string = "", emailIn: string = ""){
      this.userName = userNameIn;
      this.firstName = firstNameIn;
      this.lastName = lastNameIn;
      this.email = emailIn;
    }
  }