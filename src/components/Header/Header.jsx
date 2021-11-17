import React, { useContext, useState } from 'react';
import {  Link } from 'react-router-dom';
import { Menu, Header, Segment, Icon } from 'semantic-ui-react';
import userService from '../../utils/userService'
import { AppContext } from '../../context/AppContext';

function PageHeader() {
  const { user, handleLogout, searchList, APISearch } = useContext(AppContext)

  const LoggedIn = !user ? <Link to={`/login`}>Login</Link> : <Link to='' onClick={handleLogout}>Logout</Link>

  const headerSearch = searchList.map((item, i) => {
        return (<Menu.Item className="compact" key={i} name={`${item.name}`} onClick={() => {APISearch(item.url)}}>{item.name}</Menu.Item>)
  })




  return (
    <Segment clearing>
      <Header as='h2' floated='left'><Link to="/"><Icon name="home"></Icon>Home</Link></Header>
      <Header as='h2' floated='right'>{LoggedIn}</Header>
      <Header size='huge' textAlign='center'>MovieMatch</Header>
      <Menu inverted='true'>
      {headerSearch}
      </Menu >

    </Segment>
  )
}
export default PageHeader
