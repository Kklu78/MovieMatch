import React, {useContext, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Header, Segment} from 'semantic-ui-react';
import userService from '../../utils/userService'
import { AppContext } from '../../context/AppContext';

function PageHeader(){
    const {user, handleLogout} = useContext(AppContext)
    const [error, setError] = useState("");
    const navigate = useNavigate();
    console.log(!user, user)

    const LoggedIn = user ? 'Logout' : 'Login'


    async function handleSubmit(e) {
        e.preventDefault();

        if (!user) {
            navigate("/")
        } else {
            try {
                await userService.logout();
                handleLogout()
                navigate("/login");
              } catch (err) {
                // Invalid user data (probably duplicate email)
                setError(err.message);
              }

        }
    
        
      }
    return (
        <Segment>
            <Header as='h2' >

            <Button
                color="teal"
                fluid
                size="large"
                type="submit"
                className="btn"
                onClick={handleSubmit}
              >
                {LoggedIn}
              </Button>

                
            
            </Header>
        </Segment>
    )
}
export default PageHeader
