import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BoxIconElement } from "boxicons"

const Home = ({supabase}) => {
    const [posts, setPosts] = useState([])
    const [reversed, setReversed] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchPosts = async () => {
            const {data, error} = await supabase.from("posts").select("*")
            setPosts(data)
        }
        fetchPosts()
    }, [supabase])

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

    const sortByLikes = () => {
        const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
        setPosts(sortedPosts);
        setReversed(true);
    };

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
        <div className="flex items-center mx-2 md:mx-12 lg:mx-40">
            <p className="flex">Filters:</p>
            {!reversed ? ( <button className="m-auto bg-[#457EAC] rounded-md my-2 text-white p-1" onClick={reverseArray}>Newest to oldest</button>):( <button className="m-auto bg-[#457EAC] rounded-md my-2 text-white p-1" onClick={normalArray}>Oldest to Newest</button>)}
            <button className="m-auto bg-[#457EAC] rounded-md my-2 text-white p-1" onClick={sortByLikes}>
                Most liked
            </button>
        </div>
            {posts.length > 0 ? (
                posts.map((post,index) => (
                    <>
                    <div className="mb-8"> 
                    <div className="flex flex-row bg-[#D3D0CB] rounded-md mx-2 md:mx-12 lg:mx-40" onClick={()=> navigate(`/posts/${post.id}`) } key={index}>
                        <div className="w-full" onClick={()=> navigate(`/posts/${post.id}`) }>
                        <p className="flex mx-2 font-bold">@{post.user}</p>
                            <h1 className="flex mx-2 text-lg ">{post.title}</h1>
                            {post.img ? ( 
                                <div className="flex justify-center mx-2 my-2 md:mx-8"> {/* Added justify-center class */}
                                    <img src={post.img} className="max-w-full max-h-full" alt={post.title || 'Post Image'} /> {/* Added max-w-full and max-h-full classes */}
                                </div>
                            ) : (
                                <div className="mx-2 text-left">
                                    <p>{post.content}</p> 
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row bg-[#D3D0CB] rounded-md mx-2 md:mx-12 lg:mx-40" >
                        <p className="mx-2 font-semibold">{post.likes}</p>
                        <box-icon name='upvote'onClick={() => addLike(post.id, post.likes, index)}>Upvote</box-icon>
                        <p className="mx-2 font-semibold">{post.commentCount}</p>
                        <box-icon type='solid' name='comment-detail' onClick={()=> navigate(`/posts/${post.id}`) } ></box-icon>
                    </div>
                    </div>
                    </>
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
export default Home
