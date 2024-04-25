import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BoxIconElement } from "boxicons"
const Post = ({supabase}) => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState({
        user: "",
        content: ""
    })
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchPost = async () => {
            const {data, error} = await supabase.from("posts").select("*").eq("id", params.id).single()
            setPost(data)
            //console.log(data)
        }
        fetchPost()
    }, [supabase, params])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComment(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const postComment = async (commentData) => {
            //const updatedCommentCount = post.commentCount + 1;
            if (post.comments) {
                const { data, error } = await supabase
                .from("posts")
                .update({
                    comments: [...post.comments, commentData],
                    commentCount: post.commentCount + 1
                })
                .eq("id", params.id);
            }
            else {
                const { data, error } = await supabase
                .from("posts")
                .update({
                    comments: [commentData],
                    commentCount: 1
                })
                .eq("id", params.id);
            }
                const { data: updatedPost, error: postError } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("id", params.id)
                    .single();
                if (postError) {
                    console.error('Error fetching updated post:', postError);
                } else {
                    setPost(updatedPost);
                }
        };
        postComment(comment);
        setComment({
            ...comment,
            content: ""
        });
        //console.log(comment)
    }

    const addLike = async (postID, postLikes, index) => {
        var newLikes = postLikes + 1
        const {data, error} = await supabase.from("posts")
        .update({likes: newLikes} )
        .eq("id", postID )

        if (!error) {
            const { data: updatedPost, error: postError } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("id", params.id)
                    .single();
                if (postError) {
                    console.error('Error fetching updated post:', postError);
                } else {
                    setPost(updatedPost);
                }
        }
    }

    const goToEdit = () => {
        navigate(`/posts/edit/${post.id}`)
    }
    
    return (
        post ? (
            <>
                
                <div className="flex flex-row bg-[#D3D0CB] mt-2 rounded-md mx-2 md:mx-12 md:mt-8 lg:mx-40 lg:mt-16">
                    <div className="w-full">
                    <p className="flex mx-2 font-bold">@{post.user}</p>
                        <h1 className="text-lg flex mx-2">{post.title}</h1>
                        {post.img ? ( 
                            <>
                            <div className="flex justify-center mx-2 my-2 md:mx-8"> 
                                <img src={post.img} className="" alt={post.title || 'Post Image'} />
                            </div>
                            <p>{post.content}</p> 
                            </>
                        ) : (
                            <div className="text-left mx-2">
                                <p>{post.content}</p> 
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row bg-[#D3D0CB] rounded-md mx-2 md:mx-12 lg:mx-40" >
                    <p className="mx-2 font-semibold">{post.likes}</p>
                    <box-icon name='upvote'onClick={() => addLike(post.id, post.likes)}>Upvote</box-icon>
                    <p className="mx-2 font-semibold">{post.commentCount}</p>
                    <box-icon type='solid' name='comment-detail' onClick={()=> navigate(`/posts/${post.id}`) } ></box-icon>
                    <div className='ml-auto mr-2'>
                    <box-icon name='edit'onClick={goToEdit} ></box-icon>
                    </div>
                    {//post.edited && (<h1>Edited at {post.created_at}</h1>)}
}
                </div>


                <div className="flex flex-col items-center bg-[#E7E5DF] rounded-md mx-2 md:mx-12 md:mb-10 lg:mx-40 lg:mb-20">
                    <form className="" onSubmit={handleSubmit}>
                        <input
                            id="user"
                            name="user"
                            type="text"
                            required
                            className="mx-2 rounded-md my-2"
                            onChange={handleInputChange}
                            value={comment.user}
                            placeholder="Username"
                        />
                        <input
                            id="content"
                            name="content"
                            type="text"
                            required
                            className="mx-2 rounded-md my-2 md:w-full lg:w-full"
                            onChange={handleInputChange}
                            value={comment.content}
                            placeholder="Comment"
                        />
                        <button className="flex m-auto bg-[#457EAC] text-white p-2 rounded-md" type='submit'>Submit</button>
                        {Array.isArray(post.comments) && post.comments.map((commentString, index) => {
                            const parsedComment = JSON.parse(commentString);
                            return (
                                <div className="flex flex-col m-2" key={index}>
                                    <div className="flex">
                                    <h1 className="font-bold">@{parsedComment.user}</h1>
                                    <p className="mx-2">{parsedComment.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </form>
                </div>
            </>
        ) : (
            <>
                <h1>Loading...</h1>
            </>
        ))
}

export default Post