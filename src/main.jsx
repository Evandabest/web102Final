import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import Navbar from './Navbar.jsx'
import Create from './Create.jsx'
import Home from './Home1.jsx'
import Post from './Post.jsx'
import Update from './Edit.jsx'
import Results from './Results.jsx'


const supabaseUrl = import.meta.env.VITE_APP_URL
const supabaseKey = import.meta.env.VITE_APP_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home supabase = {supabase}/>}/>
        <Route path = "/create" element = {<Create supabase = {supabase}/>}/>
        <Route path = "/posts/:id" element = {<Post supabase = {supabase}/>}/>
        <Route path = "/posts/edit/:id" element = {<Update supabase = {supabase}/>}/>
        <Route path = "/results/:search" element = {<Results supabase = {supabase}/>}/>
        <Route path = "*" element = {<Home supabase = {supabase}/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
