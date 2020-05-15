import React from 'react'

const LoginForm = (username, password, setUsername, setPassword, onSubmit) => (

    <form onSubmit={onSubmit}>
        <div> username
            <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div> password
            <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>

)

const UserView = ({ user, onLogout }) => (
    <div> Logged in as: {user.name} ({user.username}) <button onClick={onLogout}>logout</button> </div>
)

export  { UserView, LoginForm }