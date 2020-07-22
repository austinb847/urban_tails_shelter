import React, { useState } from 'react'
import { connect } from "react-redux";
import Image from 'react-bootstrap/Image'
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


function AnimalEditForm(props) {
  const { animal } = props; 
  const [ showUpdatedMsg, setShowUpdatedMsg] = useState(false);

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
        setShowUpdatedMsg(true)
        console.log("SUCCESS:", jsonifiedResponse)
      }
    ).catch((error) => {
      console.log(error);
    })
  }

  const updateMsg = () => {
    if(showUpdatedMsg){
      return <h2>curry Updated</h2>
    } else {
      return(
        <div className='form-container'>
          <div className='form-header'>Edit this cat</div>
          <Form onSubmit={editCat}>
              <Form.Group controlId="name-input">
                <Form.Control type="text" name="name" placeholder="name" />
              </Form.Group>
              <Form.Group controlId="kind-input">
                <Form.Control type="text" name="kind" placeholder="Cat" />
              </Form.Group>
              <Form.Group controlId="age-input">
                <Form.Control type="text" name="age" placeholder="Age" />
              </Form.Group>
              <Form.Group controlId="breed-input">
                <Form.Control type="text" name="breed" placeholder="Breed" />
              </Form.Group>
              <Form.Group controlId="img-input">
                <Form.Control type="text" name="imgUrl" placeholder="Image URL" />
              </Form.Group>
              <button type="submit">Edit Cat</button>
            </Form>
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      <div className="cat-detail">
        <h2>You are editing me</h2>
        <Image width="25%" height="50%" src={animal.selectedAnimal.imgUrl} alt="photo of cat" roundedCircle/>
          <p>Name: {animal.selectedAnimal.name}</p>
          <p>Age: {animal.selectedAnimal.age}</p>
          <p>Breed:{animal.selectedAnimal.breed}</p>
      </div>
      {updateMsg()}
      
      <div className="returnList">
        <button><Link to={"/"}>Back to List</Link></button>
      </div>
      
      
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    animal: state.selectedAnimalReducer,
  };
}
export default connect(mapStateToProps)(AnimalEditForm);
