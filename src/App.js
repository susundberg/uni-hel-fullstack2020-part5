import React, { useState, useEffect } from 'react'

import BlogView from './components/Blog'
import { UserView, LoginForm } from './components/Login'
import MessageView from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({ type: '' })



    const setErrorMessage = (message, timeout_s) => {
        setMessage({ 'type': 'error', message })
        setTimeout(() => {
            setMessage({ type: '' })
        }, timeout_s * 1000)
    }
    const setInfoMessage = (message, timeout_s) => {
        setMessage({ 'type': 'info', message })
        setTimeout(() => {
            setMessage({ type: '' })
        }, timeout_s * 1000)
    }


    const onBlogSubmit = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value


        console.log("OnBlogSubmit", title, author, url)
        try {
            const newBlog = await blogService.create({ title, author, url })
            setBlogs(blogs.concat(newBlog))
            setInfoMessage( `Created: ${newBlog.title} by ${newBlog.author}`, 5 )
        } catch (error) {
            console.log("Create error", error)
            console.log("Resonse:", error.response)
            setErrorMessage( `Cannot create: ${error.response.data.error}`, 5 )
        }

    }

    const onLogout = async (event) => {
        console.log("Logout", event)
        setUser(null)
        blogService.setToken(null)
        window.localStorage.clear()
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            setUser(user)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            blogService.setToken(user.token)
        } catch (exception) {
            setErrorMessage('Wrong credentials', 5)
        }
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    return (
        <div>
            {(message.type) && <MessageView state={message} />}
            {(user) && <UserView user={user} onLogout={onLogout} />}
            {user === null ?
                LoginForm(username, password, setUsername, setPassword, handleLogin) :
                <BlogView blogs={blogs} onSubmit={onBlogSubmit} />
            }
        </div>
    )
}

export default App