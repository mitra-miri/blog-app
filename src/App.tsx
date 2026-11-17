import Blog from "./Blog"
import EditPost from "./EditPost";
import NewPost from "./NewPost";
import ReadPost from "./ReadPost"
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import type { Post } from "./types";

function App() {

  

  const [posts,setPosts] = useState<Post[]>([{"title": "My Journey into React" , 
                  "text":`I started learning React 
                        to understand how modern web 
                        applications are built. At first, 
                        concepts like state, components, 
                        and event handling felt confusing,
                          but building small projects helped 
                          me understand them step by step. 
                          This blog is a place where I can document
                          what I learn, share my progress, and keep 
                          track of my journey as a developer.`, 
                  "category":"React",
                  "id":0}])


  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (

    <BrowserRouter >
        <Routes>
          <Route path='/' element={<Blog darkMode={darkMode} setDarkMode={setDarkMode} posts={posts} setPosts={setPosts}/>}></Route>
          <Route path='/new-post'  element={<NewPost darkMode={darkMode} setDarkMode={setDarkMode} posts={posts} setPosts={setPosts}/>} ></Route>
          <Route path='/read-post/:id'  element={<ReadPost darkMode={darkMode} setDarkMode={setDarkMode} posts={posts}/>} ></Route>
          <Route path='/edit-post/:id'  element={<EditPost darkMode={darkMode} setDarkMode={setDarkMode} posts={posts} setPosts={setPosts}/>} ></Route>
        </Routes>

    </BrowserRouter>
    
  )
}

export default App
