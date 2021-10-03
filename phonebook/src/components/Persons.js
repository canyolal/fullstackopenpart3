import React from 'react'
import Names from './Names.js'


const Persons = ({persons,setPersons}) => {

    return(
        <div>
            {persons.map(person =>
                <Names key={person.name} persons={person} setPersons={setPersons}/> 
            )}
        </div>
    )
}

export default Persons