export class User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    accountType: string;
    // description: string;

    constructor(userNameIn: string = "", firstNameIn: string = "", lastNameIn: string = "", emailIn: string = "", accountTypeIn: string = ""){
      this.userName = userNameIn;
      this.firstName = firstNameIn;
      this.lastName = lastNameIn;
      this.email = emailIn;
      this.accountType = accountTypeIn;
    }
  }