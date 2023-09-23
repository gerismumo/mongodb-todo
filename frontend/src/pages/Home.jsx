import React, { useState } from 'react';


function Home() {
    const[SearchUser, setSearchUser] = useState('');
    const[ShowAddForm, setShowAddForm] = useState(false);
    const[ShowEditForm, setShowEditForm] = useState(false);

    const handleSearchUser = (e) => {
        setSearchUser(e.target.value);
    }

    const displayAddForm = () => {
        setShowAddForm(prevState => !prevState);
    }
    const displayEditForm = () => {
        setShowEditForm(prevState => !prevState);
    }

    const handleAddUser = () => {
        
        console.log('add new user');
    }

    const handleEditUser = () => {
        console.log('edit user');
    }

    const handleDeleteUser = () => {
        console.log('delete user');
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
                            />
                            <input 
                                type='text'
                                placeholder='User position'
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
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>Web Developer</td>
                            <td>8:20 a.m</td>
                            <td><button className='edit-user' onClick={displayEditForm}>{ShowEditForm ? 'Cancel':'Edit'}</button>
                            {
                                ShowEditForm && (
                                    <div className='edit-form'>
                                        <form onSubmit={handleEditUser}>
                                        <input 
                                            type="text" 
                                            placeholder='User name'
                                        />
                                        <input 
                                            type='text'
                                            placeholder='User position'
                                        />
                                        <button type='submit'>Update</button>
                                    </form>
                                    </div>
                                )
                            }
                            </td>
                            <td><button className='delete-user' onClick={handleDeleteUser}>Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;