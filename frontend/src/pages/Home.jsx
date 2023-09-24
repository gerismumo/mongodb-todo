import React, { useEffect, useState } from 'react';


function Home() {
    const[SearchUser, setSearchUser] = useState('');
    const[ShowAddForm, setShowAddForm] = useState(false);
    const[ShowEditForm, setShowEditForm] = useState(false);
    const[UsersList, setUsersList] = useState([]);
    const[newName, setNewName] = useState('');
    const[newPosition, setNewPosition] = useState('');
    const[EditName, setEditName] = useState('');
    const[EditPosition, setEditPosition] = useState('');

    //selecte uses list
    useEffect(() => {
        fetch('http://localhost:5000/todos')
        .then(response => response.json())
        .then(data => setUsersList(data))
        .catch((err) => console.log(err));
    },[]);

    // const fetchUsers = async() => {
    //     try {
    //         const respponse = await axios.get('')
    //     }  catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleSearchUser = (e) => {
        setSearchUser(e.target.value);
    }

    const displayAddForm = () => {
        setShowAddForm(prevState => !prevState);
    }
    const displayEditForm = () => {
        setShowEditForm(prevState => !prevState);
    }

    const handleAddUser = async (e) => {
        e.preventDefault();

        const userData = {
            name: newName,
            position: newPosition
        }
        try{
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(userData),
            });
            if(!response.ok) {
                throw new Error('Couldn\'t add user');
            } else {
                
                setUsersList([...UsersList, userData]);
                setNewName('');
                setNewPosition('');
                setShowAddForm(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditUser = async( userId) => {
        // e.preventDefault();
        const updatedUser = {
            name: EditName,
            position: EditPosition
        }
        console.log(updatedUser);
        try {
            const response = await fetch(`http://localhost:5000/todos/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(updatedUser),
            });
            if(!response.ok) {
                throw new Error('Error in add User');
            } else {
                // const updateUsersDetails = UsersList.map(user => {
                //     if(user.id === userId) {
                //         return {...user, ...updatedUser}
                //     }
                //     return user;
                // });
                // setUsersList(updateUsersDetails)
                window.location.reload();
                setShowEditForm(false);
            }

    } catch (error) {
        console.log(error);
    }
    }

    const handleDeleteUser = async(userId) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting user');
            } else {
                const updatedUsersList = UsersList.filter(user => user.id !== userId);
                setUsersList(updatedUsersList);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="home-page">
            <div className="header">
                <h2>Todo List</h2>
            </div>
            <div className="search-add">
                <div className="search-user">
                    <input 
                        type="text" 
                        placeholder='Search'
                        value={SearchUser}
                        onChange={handleSearchUser}
                    />
                </div>
                <div className="add-user">
                    <button className='add-user' onClick={displayAddForm}>{ShowAddForm ? 'Clear Add':'Add User'}</button>
                </div>
            </div>
            {
                ShowAddForm && (
                    <div className="add-user-form">
                        <h3>Add New User</h3>
                        <form onSubmit={handleAddUser}>
                            <input 
                                type="text" 
                                placeholder='User name'
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <input 
                                type='text'
                                placeholder='User position'
                                value={newPosition}
                                onChange={(e) => setNewPosition(e.target.value)}

                            />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                )
            }
            

            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Position</th>
                            <th>Time Created</th>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(UsersList) && UsersList.length === 0 ? (
                            <tr>
                                <td colSpan="6">No Data</td>
                            </tr>
                        ) : (
                            Array.isArray(UsersList) &&
                                UsersList.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.position}</td>
                                    <td>{user.createdAt}</td>
                                    <td>
                                        <button
                                            className='edit-user'
                                            onClick={() => {
                                                displayEditForm();
                                                setEditName(user.name)
                                                setEditPosition(user.position);
                                            }}
                                        >
                                            {ShowEditForm ? 'Cancel' : 'Edit'}
                                        </button>
                                        {ShowEditForm && (
                                            <div className='edit-form'>
                                                <form onSubmit={() => handleEditUser(user._id)}>
                                                    <input
                                                        type="text"
                                                        placeholder='User name'
                                                        value={EditName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                    />
                                                    <input
                                                        type='text'
                                                        placeholder='User position'
                                                        value={EditPosition}
                                                        onChange={(e) => setEditPosition(e.target.value)}
                                                    />
                                                    <button type='submit'>Update</button>
                                                </form>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button className='delete-user' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Home;