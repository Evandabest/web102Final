import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './index.css'
import logo from '/public/logo.png'


const NavBar = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const homeClick = () => {
        navigate('/posts')
    }
    const createClick = () => {
        navigate('/create')
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        navigate(`/results/${search}`)
    }

    return (
        <>
            <div className="bg-[#457EAC] w-full flex justify-between items-center p-2">
                <img className="w-14 md:w-20" src = {logo}/>
                <button className="bg-[#686868] text-white p-1 rounded-lg" onClick={homeClick}>Home</button>
                <form onSubmit={handleSubmit} className="flex-1 px-4">
                    <input type='text' placeholder="Search by title" className="w-full p-1 rounded-lg" value={search} onChange={handleChange}/>
                </form>
                <button className="bg-[#686868] text-white p-1 rounded-lg" onClick={createClick}>Create</button>
            </div>
        </>
    )
    
}

export default NavBar