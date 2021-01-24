import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AlertBox from './AlertBox';
import axios from 'axios';


export default function Login() {
  /* These are states in React using the useState hook. State persists even through multiple renders.
  The first variable in each array is the state variable, and the second variable is a function that sets the state. */
  const [message, setMessage] = useState("This is the message");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");


  /* This function checks to make sure username and password are not blank.
  Finally, it posts (through axios) to the login route in order to log in. if successful,
  it then gets user data and sets the global user variable (in redux) to the user.
  Then redirects from login page to home page. */
  const handleSubmit = (event) => {
    // prevent page reload upon form submit:
    event.preventDefault();

    console.log("username", username);
    console.log("password", password);

    if(username === "" || password === ""){
        setMessage("both username and password must be given");
    }else{
        let user = {
            username: username,
            password: password
        }

    // we want to now check against the database - if the username and password are correct and align
    // in React, if we want to communicate with API or database we use AXIOS to do it 
    axios.post('/api/login', user).then((data) => {
        console.log("data", data);
    }).catch((err) =>  {
        console.log(err.message);
        if(err.message === 'Request failed with status code 401'){
            setMessage("Incorrect username or password");
        }
    })
    }
  }

  /** Upon button push, this function should redirect the user to the signup page, at '/signup' */
  const goToSignup = () => {
    
  }

  /** this function runs when the dev log in button is pressed.
  It simply submits a default username and password, '1' and '111111' for ease of development */
  const devLogin = () => {
    
  }

  return (<>
    <Container className='loginSignupContainer'>

      <Form>
        {/* This row contains the username input. */}
        <Form.Row>
          {/* this column is empty. React-Bootstrap automatically divides the columns in the row evenly (12 columns per row).
          The column can also be manually be given a value. */}
          <Col></Col> 
          <Col>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name='username'
                // this sets the 'username' state on form change
                onChange={(event) => setUsername(event.target.value)}
                type="text"
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Form.Row>

        <Form.Row>
        {/* This row contains the password input. */}
          <Col></Col>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                // this sets the 'password' state on form change
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name='password'
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Form.Row>

        <Form.Row>
        {/* This row contains the submit button. */}
          <Col></Col>
          <Col>
          {/* this runs the handleSubmit function when the Log in button is clicked */}
            <Button className='signupLoginBtns' onClick={handleSubmit} variant="primary" type="submit">
              Log In
            </Button>
          </Col>
          <Col></Col>
        </Form.Row>

        <Form.Row>
        {/* This row contains the sign up button. */}
          <Col></Col>
          <Col>
            <Button className='signupLoginBtns' onClick={goToSignup} variant="success" type="submit">
              Sign Up Form
            </Button>
          </Col>
          <Col></Col>
        </Form.Row>

        <Form.Row>
          {/* This row contains the hidden alert box, from AlertBox.js.
          The alertBox shows when the message changes. */}
          <Col></Col>
          <Col>
            <AlertBox
              message={message}
            />
          </Col>
          <Col></Col>
        </Form.Row>

        <Button onClick={devLogin}>
          Dev Login for protected route
        </Button>
        <br />
        <a href='/loginstatus'>Go to page dependent on login status</a>
      </Form>
    </Container>
  </>)
}