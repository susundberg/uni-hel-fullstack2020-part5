import React, { useState } from 'react'
import Togglable from './Toggable'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onRemove, user }) => {
    const [expanded, setExpand] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }



    const blogUser = blog.user ? blog.user.name : "?"
    console.log("blog", blogUser, blog.title)
    if (expanded) {
        return (
            <div style={blogStyle}>
                <ul>
                    <li> Title: {blog.title} </li>
                    <li> Author: {blog.author} </li>
                    <li> Url: {blog.url} </li>
                    <li> Likes: {blog.likes} </li>
                    <li> Added by: {blogUser} </li>
                </ul>
                <button onClick={() => { setExpand(false) }}>hide</button>
                <button onClick={() => { onLike(blog) }}>like</button>
                {user.username === blog.user.username && <button onClick={() => { onRemove(blog) }}>remove</button>}

            </div>
        )

    } else {
        return (
            <div style={blogStyle}>
                {blog.title} by {blog.author} <button onClick={() => { setExpand(true) }}>show</button>
            </div>
        )
    }
}

const BlogForm = ({ onSubmit }) => (


    <form onSubmit={onSubmit}>
        {["title", "author", "url"].map((x) => (
            <div key={x}> {x} <input type="text" name={x} /></div>
        ))}

        <button type="submit">Submit</button>
    </form>

)

const BlogView = ({ blogs, onSubmit, onLike, onRemove, user }) => {
    const blogFormRef = React.createRef()

    const onSubmitWithHide = (event) => {
        blogFormRef.current.toggleVisibility()
        return onSubmit(event)
    }

    return (
        < div >
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm onSubmit={onSubmitWithHide} />
            </Togglable>

            <h2> Existing Blogs </h2>
            {blogs.map((b) => (<Blog blog={b} key={b.id} onRemove={onRemove} onLike={onLike} user={user} />))}
        </div >

    )
}

BlogView.propTypes = {
    blogs: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    user: PropTypes.func.isRequired
}

export default BlogView
