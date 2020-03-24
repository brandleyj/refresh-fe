import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, fetchTeams, fetchUserTeamName } from '../actions/actions';
import { Body, Title, SearchFlex, SearchFlex2, List, Dropdown, Input, Photo } from '../styled-components/user-list-styles'
import UserCard from './user-card';
import glass from './glass.png'

const UserList = props => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showNulls, setShowNulls] = useState(false);
    const [update, setUpdate] = useState(false)
    const [display, setDisplay] = useState(false)
    
    useEffect(() => {
        props.fetchAllUsers();
        props.fetchTeams()
    }, [update])

    const rerender = (change) => {
        setUpdate(change)
    }


    const changeHandler = event => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    };

    const toggleUsers = event => {
        event.preventDefault();
        setShowNulls(!showNulls);
    }

    const routeToUserProfile = userId => {
        props.history.push(`/users/${userId}`)
    }

    const showImage = event => {
        console.log('Show Image Click', display)
        setDisplay(!display)
    }

    if(props.allUsers.length === 0) { return <h1>Loading</h1> }

    
    const filteredUsers = props.allUsers.sort((a, b) => {
        return b.team_id - a.team_id
    }).filter(employees => {
        if(searchTerm === null) {
            return employees
        } else if(showNulls === true) {
            return employees.team_id === null
        } else if(employees.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || employees.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return employees
        }
    }).map(employees => {
        return (
            <div key={employees.id}>
                <div>
                    <UserCard 
                    info={employees}
                    teams={props.teams} 
                    routeToUserProfile={routeToUserProfile}
                    update={update}
                    rerender={rerender}
                    />
                </div>
            </div>
        )
    })

    return (
        <div>
            <Body>
            <Title>
            <h1>Profiles</h1>
            </Title>
            <SearchFlex>
            <SearchFlex2>
                <Input>
                    <input
                    id="search"
                    type="text"
                    name="searchBar"
                    placeholder="&#xF002; Search"
                    onChange={changeHandler}
                    value={searchTerm}
                    />
                </Input>
            <form className='toggleButton'>
                <Dropdown onChange={toggleUsers}>
                    <option>All Users</option>
                    <option>No Team</option>
                </Dropdown>
            </form>
            </SearchFlex2>
            </SearchFlex>
            <List>
                {filteredUsers}
            </List>
            </Body>
        </div>
    )
}



export default connect(
    state => {
        return {
            teams: state.teams,
            allUsers: state.allUsers,
            singleUser: state.singleUser,
            isFetching: state.isFetching,
            error: state.error
        }
    },
    { fetchAllUsers, fetchTeams, fetchUserTeamName }
)(UserList);