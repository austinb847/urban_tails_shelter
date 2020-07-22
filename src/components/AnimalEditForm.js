import React from 'react'
import { connect } from "react-redux";


function AnimalEditForm(props) {
  const { animal } = props; 

  function editCat(event){
    event.preventDefault();
    const inputtedData = {
      name: event.target.name.value,
      kind: event.target.kind.value,
      age: event.target.age.value,
      breed: event.target.breed.value,
      imgUrl: event.target.imgUrl.value
    }

    console.log(inputtedData)
    fetch(`https://afternoon-headland-99155.herokuapp.com/api/v1/animals/${animal.selectedAnimal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputtedData),
    })
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        console.log("SUCCESS:", jsonifiedResponse)
      }
    ).catch((error) => {
      console.log(error);
    })
  }


  return (
    <React.Fragment>
      <form onSubmit={editCat}>
        <input type="text" name="name" placeholder="Name"></input>
        <br />
        <input type="text" name="kind" placeholder="Cat"></input>
        <br />
        <input type="text" name="age" placeholder="Age"></input>curry
        <br />
        <input type="text" name="breed" placeholder="Breed"></input>
        <br />
        <input type="text" name="imgUrl" placeholder="Image URL"></input>
        <br />
        <button type="submit">Edit</button>
      </form>
      
      
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    animal: state.selectedAnimalReducer,
  };
}
export default connect(mapStateToProps)(AnimalEditForm);
