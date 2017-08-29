function Person(name, age, isMale) {
    if (typeof name == 'string' && name.trim().length > 0) {
        this.name = name;
    }
    if (!isNaN(age) && age > 0) {
        this.age = age;
    }
    if (typeof isMale == 'boolean') {
        this.isMale = isMale;
    }
}

Person.prototype.showPersonInfo = function() {
    if (this instanceof Person) {
        for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                console.log(prop + " : " + this[prop]);
            }
        }
    }
}

function Student(name, age, isMale, score) {
    Person.call(this, name, age, isMale);
    if (!isNaN(score) && score > 0) {
        this.score = score;
    }
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.showStudentInfo = function() {
    Person.prototype.showPersonInfo.call(this);
}

function Employee(name, age, isMale, daySalary) {
    Person.call(this, name, age, isMale);
    if (!isNaN(daySalary) && daySalary > 0) {
        this.daySalary = daySalary;
    }
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.calculateOvertime = function(hours) {
    var overtime = 0;
    var dayHours = 8;
    if (!isNaN(hours) && hours > 0 && this.age >= 18) {
        overtime = ((this.daySalary / dayHours) * 1.5) * hours;
    }
    return overtime;
}

Employee.prototype.showEmployeeInfo = function() {
    Person.prototype.showPersonInfo.call(this);
}

var people = [];
var magi = new Person("Magdalena", 27, false);
var yoana = new Student("Yoana", 20, false, 50);
var preslava = new Employee("Preslava", 20, false, 80);
var emi = new Person("Emiliya", 26, false);
var gosho = new Employee("Georgi", 21, true, 50);
var simona = new Student("Simona", 20, false, 100);
people.push(magi, yoana, preslava, emi, gosho, simona);

for (var index = 0; index < people.length; index++) {
    if (people[index] instanceof Student) {
        people[index].showStudentInfo();
        console.log();
        continue;
    }
    if (people[index] instanceof Employee) {
        people[index].showEmployeeInfo();
        console.log();
        continue;
    }
    if (people[index] instanceof Person) {
        people[index].showPersonInfo();
        console.log();
    }
}
console.log();

for (var index = 0; index < people.length; index++) {
    var overtimeHours = 2;
    if (people[index] instanceof Employee) {
        people[index].showEmployeeInfo();
        console.log("overtime : " + people[index].calculateOvertime(overtimeHours));
        console.log();
    }
}