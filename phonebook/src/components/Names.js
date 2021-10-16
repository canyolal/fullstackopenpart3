import React from "react"
import personService from "./../services/personService.js"


const Names = ({ persons, setPersons }) => {
    const deleteUser = (event) => {
        if (window.confirm(`Delete ${persons.name}?`)) {
            personService
                .deleteUser(persons._id)
                .then(response => {
                    console.log(response)
                    setPersons(response)
                })
        }
    }

    return (
        <form onSubmit={deleteUser}>
            {persons.name} {persons.number}
            <button className="deleteButton" type="submit">Delete</button>
        </form>
    )
}

export default Names