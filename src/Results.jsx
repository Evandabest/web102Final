import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"


const Results = ({supabase}) => {
    const params = useParams()
    const [posts, setPosts] = useState([])
    const [reversed, setReversed] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchPosts = async () => {
            const {data, error} = await supabase.from("posts").select("*")
            const data1 = await data
            const filtered =  data1.filter(post =>
                post.title.toLowerCase().includes(params.search.toLowerCase())
            );
            setPosts(filtered)
        }
        fetchPosts()
    }, [supabase, params])

    const filterPosts = () => {
        return posts.filter(post =>
            post.title.toLowerCase().includes(params.search.toLowerCase())
        );
    };

    const addLike = async (postID, postLikes, index) => {
        var newLikes = postLikes + 1
        const {data, error} = await supabase.from("posts")
        .update({likes: newLikes} )
        .eq("id", postID )

        if (!error) {
            const updatedPosts = [...posts];
            updatedPosts[index].likes = newLikes;
            setPosts(updatedPosts);
        }
    }
    const reverseArray = () => {
        const newPosts = [...posts].reverse();
        setPosts(newPosts);
        setReversed(true)
    };    

    const normalArray = () => {
        const newPosts = [...posts].reverse();
        setPosts(newPosts);
        setReversed(false)
    };    
    
    return (
        <>
        {!reversed ? ( <button onClick={reverseArray}>Oldest to newest</button>):( <button onClick={normalArray}>Newest to oldest</button>)}
            {posts.length > 0 ? (
                posts.map((post,index) => (
                    <div className="h-[200px]"key={index}>
                        <div onClick={()=> navigate(`/posts/${post.id}`) }>
                            <h1>{post.title}</h1>
                            <p>{post.user}</p>
                            {post.img && <img src={post.img} className="w-[400px] m-auto" alt={post.title || 'Post Image'} />}
                            <p>{post.content}</p>
                            <p>{post.likes}</p>
                        </div>
                        <button onClick={() => addLike(post.id, post.likes, index)}>Like</button>
                    </div>
                ))
            ): (
                <>
                    <h1>There are no posts yet!</h1>
                </>
            )
            }
        </>
    )
}

export default Results