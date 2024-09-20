export const Post = ({post}) => {
    
    return (
        <div className='post'>
            <img src={post.cover} />
            <div className='post-content'>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
        </div>
    )
}