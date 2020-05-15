import React, { useState } from 'react'

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        setUsername('')
        setPassword('')
        onLogin(username, password)

    }

    return (
        <form onSubmit={onSubmit}>
            <div> username
                <input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div> password
                <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
        </form>)

}

const UserView = ({ user, onLogout }) => (
    <div> Logged in as: {user.name} ({user.username}) <button onClick={onLogout}>logout</button> </div>
)

export { UserView, LoginForm }