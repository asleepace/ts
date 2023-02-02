console.clear()

// creates a class from generic object:


function createClassFromType<T>() {
  return class {
    constructor(args: T) {
      Object.assign(this, args)
    }
  } as ({
    new (args: T): T
  })
}


// create a base class from my person type


type Person = {
  name: string
}

const PersonClass = createClassFromType<Person>()


// extend the base class


class PersonChild extends PersonClass {
  constructor(person: Person) {
    super(person)
  }
  greet() {
    console.log(`Hello, ${this.name}`)
  }
}

// example usage

const classPerson = new PersonClass({ name: 'Alice' })
console.log(classPerson.name)   // Alice

const childPerson = new PersonChild({ name: 'Bob' })
childPerson.greet()   // "Hello, Bob!"

function doSomethingWith(personType: Person) {
  // example method only acceots person type
}

doSomethingWith(classPerson)  // this is ok!
doSomethingWith(childPerson)  // this is ok!

if (childPerson instanceof PersonClass) {
  console.log('person is instanceof PersonClass!')
}

if (childPerson instanceof PersonChild) {
  console.log('person is instanceof MyPerson!')
}

if (typeof childPerson === typeof classPerson) {
  console.log('this works too!')
}