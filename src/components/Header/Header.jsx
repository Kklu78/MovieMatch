import React, { useContext, useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import { Menu, Header, Segment, Icon, Dropdown } from 'semantic-ui-react';
import userService from '../../utils/userService'
import { AppContext } from '../../context/AppContext';

function PageHeader() {
  const { user, handleLogout, searchList, APISearch, Title, movieData, allUsers, getAllUsers, getAllFriends, userFriends } = useContext(AppContext)
  const LoggedIn = !user ? <Link style={{'color': 'black'}} to={`/login`}><Icon name="sign in"></Icon>Login</Link> : <Link style={{'color': 'black'}} to='' onClick={handleLogout}><Icon name="sign out"></Icon>Logout</Link>
  
  const headerSearch = searchList.map((item, i) => {
        return (<Menu.Item key={i} name={`${item.name}`}><Link onClick={() => {APISearch(item.url)}} to='/'>{item.name}</Link></Menu.Item>)
  })

  const allUsersList = allUsers?.map((u, i) => {
    return (user?._id != u?._id 
      ? <Dropdown.Item as={Link} to={`/profile/${u?._id}`} key={i}>{u.username}</Dropdown.Item>
      : null)
  })

  const userFriendsList = userFriends.friends?.map((u, i) => {
    const userFriend = allUsers?.filter(user => user._id === u.recipient)[0]
    return (<Dropdown.Item as={Link} to={`/profile/${userFriend?._id}`} key={i}>{userFriend?.username}</Dropdown.Item>)
  })


  useEffect(() => {
    getAllUsers()
    getAllFriends()

  },[Title])

  
  return (<>
      <Header as='h2' floated='left'><Link style={{'color': 'black'}} onClick={() => {APISearch(searchList[0].url)}} to="/"><Icon name="home"></Icon>Home</Link></Header>
      <Header as='h2' floated='right'>{LoggedIn}</Header>
      <Header size='huge' textAlign='center'><Icon style={{'color': 'black'}} name="ticket alternate"></Icon>MovieMatch {Title ? `: ${Title}`: movieData.title ? `: ${movieData.title}` : null}</Header>
      <Menu inverted>
      {headerSearch}
      <Menu.Item position='right' as={Link} to={`/profile/${user?._id}`} >Profile</Menu.Item>
      <Dropdown text='Friends List' pointing className='link item'>
      <Dropdown.Menu>
          {userFriendsList}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown text='All Users' pointing className='link item'>
      <Dropdown.Menu>
        {allUsersList}
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Item > {user ? `Logged In as ${user.username}` : 'Not Logged In'}</Menu.Item>
      </Menu >
    </>
  )
}
export default PageHeader
