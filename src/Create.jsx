import { useState } from 'react';

const Create = ({ supabase }) => {
    const [form, setForm] = useState({
        title: '',
        user: '',
        content: '',
        img: "",
        postPass: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (form.img == '') {
            form.img = null
        }

        const { data, error } = await supabase
            .from("posts")
            .insert([form])

            if (error) {
                console.error('There was an error posting:', error);
            } else {
                console.log('Post successfully added', data);
                setForm(prevForm => ({
                    ...prevForm,
                    title: '',
                    content: '',
                    img: ''
                }));
            }
    }

    return (
        <>      
            <div className="flex flex-col bg-[#D3D0CB] rounded-md mt-2 mx-2 md:mx-12 lg:mx-40">
                <h1 className="my-2">Create a post</h1>
                <form className="items-center mx-2 " onSubmit={handleSubmit}>
                    <input
                        id="user"
                        name="user"
                        type="text"
                        className="w-full mt-4 rounded-md"
                        onChange={handleInputChange}
                        value={form.user}
                        placeholder="Username"
                        required
                    />
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="flex w-full m-auto mt-4 rounded-md"
                        onChange={handleInputChange}
                        value={form.title}
                        placeholder="Title"
                        required
                    />
                    <input
                        id="content"
                        name="content"
                        type="text"
                        className="flex w-full m-auto mt-4 rounded-md"
                        onChange={handleInputChange}
                        value={form.content}
                        placeholder="Content (Optional)"
                    />
                    <input
                        id="imgUrl"
                        name="img"
                        type="text"
                        className="flex w-full m-auto mt-4 rounded-md"
                        onChange={handleInputChange}
                        value={form.img}
                        placeholder="Image Url (Optional)"
                    />
                    <input
                        id="password"
                        name="postPass"
                        type="pass"
                        className="flex w-full m-auto mt-4 rounded-md"
                        onChange={handleInputChange}
                        value={form.postPass}
                        placeholder="Password"
                        required
                    />
                    <button className="flex my-2 bg-[#457EAC] m-auto p-1 rounded-md" type='submit'>Submit</button>
                </form>
            </div>
        </>
    );
};

export default Create;
