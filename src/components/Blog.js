import React from 'react'
const Blog = ({ blog }) => (
    <div>
        {blog.title} {blog.author}
    </div>
)

const BlogForm = ({ onSubmit }) => (


    <form onSubmit={onSubmit}>
        {["title", "author", "url"].map((x) => (
            <div key={x}> {x} <input type="text" name={x} /></div>
        ))}

        <button type="submit">Submit</button>
    </form>

)
const BlogView = ({ blogs, onSubmit }) => (
    <div>
        <h2> New Blog </h2>
        <BlogForm onSubmit={onSubmit} />
        <h2> Existing Blogs </h2>
        {blogs.map((b) => (<Blog blog={b} key={b.id} />))}
    </div>

)
export default BlogView
