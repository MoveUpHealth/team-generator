// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, id, email, officeNumber){
        Employee.call(this, name, id, email)
        
        this.officeNumber = officeNumber
    }

    getRole (){
        const role = "Manager"
        return role
    }

    
    getOffice () {
        return this.officeNumber
    }

    printInfo () {
        console.log(`Employee: ${this.name}\n id: ${this.id}\n email: ${this.email}\n office: ${this.officeNumber}\n`)
    }

}

const manager = new Manager('fred', 156, 'fred@fred.com', 1221)

manager.printInfo()

module.exports = Manager