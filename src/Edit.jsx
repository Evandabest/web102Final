import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Update = ({supabase}) => {
    const params = useParams()
    const navigate = useNavigate()
    const [passw, setPassw] = useState("")
    const [post, setPost] = useState(null)
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            const {data, error} = await supabase.from("posts").select("*").eq("id", params.id).single()
            setPost(data)
        }
        fetchPost()
    }, [])

    const handleChange = (e) => {
        setPassw(e.target.value)
    }
    const back = () => {
        navigate(`/posts/${params.id}`)
    }

    const checkPass = () => {
        //console.log(post.postPass, passw)
        if (post.postPass == passw) {
            setAuth(true)
        }
        else (
            alert("Try again!")
        )
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const deletePost = async () => {
        try {
          await supabase.from("posts").delete().eq("id", params.id);
          navigate("/posts");
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      };
    
    
    

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (post.img == '') {
            post.img = null
        }

        const editedPost = {
            ...post,
            edited: true
        }

        const { data, error } = await supabase
            .from("posts")
            .update(editedPost)
            .eq("id", params.id )


            if (error) {
                console.error('There was an error posting:', error);
            } else {
                console.log('Post successfully added', data);
                back()
            }
    }

    if (auth == false) {
        return (
            <>
                <div className="bg-[#D3D0CB] m-2 rounded-md p-2 flex flex-col items-center">
                    <h1 className="my-2">Enter the post password</h1>
                    <input type="text" className="rounded-md" value={passw} placeholder="Password" onChange={handleChange}></input>
                    <button className="bg-[#457EAC] p-2 rounded-md text-white my-2" onClick={checkPass}>Submit</button>
                    <button className="bg-[#E7E5DF] p-2 rounded-md" onClick={back}>Back</button>
                </div>
            </>
        )
    }
    else {
        return (
            <>
            <div className="flex flex-col bg-[#D3D0CB] rounded-md mt-2 mx-2 md:mx-12 lg:mx-40">
                <h1 className="my-2">Edit your post</h1>
                <form className=" mx-2 items-center" onSubmit={handleSubmit}>
                    <input
                        id="user"
                        name="user"
                        type="text"
                        className="w-full mt-4 rounded-md"
                        onChange={handleInputChange}
                        value={post.user}
                        placeholder="Username"
                        required
                    />
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="m-auto flex mt-4 w-full rounded-md"
                        onChange={handleInputChange}
                        value={post.title}
                        placeholder="Title"
                        required
                    />
                    <input
                        id="content"
                        name="content"
                        type="text"
                        className="m-auto flex mt-4 w-full rounded-md"
                        onChange={handleInputChange}
                        value={post.content}
                        placeholder="Content"
                    />
                    <input
                        id="imgUrl"
                        name="img"
                        type="text"
                        className="m-auto flex mt-4 w-full rounded-md"
                        onChange={handleInputChange}
                        value={post.img}
                        placeholder="Image Url"
                    />
                    <input
                        id="pass"
                        name="pass"
                        type="pass"
                        className="m-auto flex mt-4 w-full rounded-md"
                        onChange={handleInputChange}
                        value={post.postPass}
                        placeholder="password"
                        required
                    />
                    <button className="flex my-2 bg-[#457EAC] m-auto p-1 rounded-md" type='submit'>Submit</button>
                    <button className="bg-[#E7E5DF] p-2 flex m-auto my-2 rounded-md" onClick={deletePost}>Delete post</button>
                </form>
            </div>
            </>
        )
    }
}

export default Update