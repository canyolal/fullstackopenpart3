import React from 'react'
import personService from './../services/personService.js'
 
const PersonForm = ({newName,newNumber,persons,setNewName,setNewNumber,setPersons,message,setMessage}) =>{

    const addContact = (event) => {
        event.preventDefault()
    
        const nameObject = {
          name: newName,
          number: newNumber,
          id: persons.length +1
        }
    
        let nameChecker = false //control whether name in the list or not

        let numberChecker = false //control whether number in the list or not
    
        for(let i=0; i<persons.length; i++){
            if (persons[i].name.toLowerCase() === newName.toLowerCase()){
                nameChecker = true
            }
            if (persons[i].number.toLowerCase() === newNumber.toLowerCase()) {
                numberChecker = true
            }
        }

        if(nameChecker){ //if name exists in db
            //if in the list
            setNewName('')
            setNewNumber('')

            if (!numberChecker){ // do you want to update your number? 
                if (window.confirm(`${newName} is already added to persons, replace the old number with a new one?`)){
                    const matchedPerson = persons.filter(person => 
                        person.name.toLowerCase() === newName.toLowerCase() ?
                        person : ""
                    )
                    personService
                        .update(matchedPerson[0].id, {name: matchedPerson[0].name, number: newNumber, id: matchedPerson[0].id})
                        .then(response => {
                            const newPersons=persons.filter(person => 
                                person.name === response.name ? 
                                person.number = response.number : person.number)
                            setPersons(newPersons)
                        })
                        .catch(error => {
                            console.log("This user is already deleted.")
                            setMessage(`Information of ${matchedPerson[0].name} has already been removed from server.`)
                        })
                }
            }
            else{
                //do nothing if do not give consent to update the number
            }
        }
        else{
            //if not in the list
            console.log(nameObject)
            personService
                .create(nameObject)
                .then(returnedData => {
                    setPersons(persons.concat(nameObject))
                    setNewName('')
                    setNewNumber('')
                    setMessage(`${nameObject.name} is added`)
                    setTimeout(()=> setMessage(null),3000)
            })
            .catch(response => {
                console.log('fail')
            })

        }
    
      }

    const handleNewNumber = (event) =>{
        setNewNumber(event.target.value)

    }
    
    const handleNewName = (event) =>{
        setNewName(event.target.value)

    }

    return(
        <form onSubmit={addContact}>
            name:
                <input 
                    type="text"
                    value={newName}
                    onChange={handleNewName}
                />
            <br/>
            number: 
                <input 
                    type ="text"
                    value={newNumber}
                    onChange={handleNewNumber}  
                />
            <br/>
            <button type="submit">Add</button>
         </form>
    )
    
}


export default PersonForm