import {useState} from "react"
import { Link ,useNavigate,useParams} from "react-router-dom";

import menuIcon from "./assets/menu3.png" 

import sun from "./assets/sun3.png" 
import moon from "./assets/moon.png" 
import homeIcon from "./assets/home.png"

import type { SharedProps,Post } from "./types";
import type { Dispatch,SetStateAction } from "react";
import type { ChangeEvent } from "react";




interface EditPostProps extends SharedProps{
    setPosts:Dispatch<SetStateAction<Post[]>>;
}

interface EditPostFormProps extends EditPostProps{
    post:Post;
}

function EditPost({darkMode, setDarkMode,posts,setPosts}:EditPostProps) {


    const {id} = useParams()
    const post = posts.find(post => post.id === Number(id));
    if(!post){return (<p>Post not found.</p>);}

    return(<EditPostForm darkMode={darkMode} setDarkMode={setDarkMode} posts={posts} 
        setPosts={setPosts}post={post}/>)
}
function EditPostForm ({darkMode, setDarkMode,posts,setPosts,post}:EditPostFormProps){
    const [openCategories, setOpenCategories] = useState<string[]>([]);
    const[openMenu,setOpenMenu] = useState(false)
    const [title,setTitle] = useState(post.title)
    const [category,setCategory] = useState(post.category)
    const [postContent,setPostContent] = useState(post.text)
    const navigate = useNavigate()

    
    
    const handleOpenMeno = ()=>{
        setOpenMenu(o => !o)

    }
    const handleCategoryClick = (category:string) => {
    setOpenCategories(c =>
        c.includes(category)
            ? c.filter(c => c !== category)
            : [...c, category]
    )
    }
    


    const handleTitleChange =(event:ChangeEvent<HTMLInputElement>)=>{
        
        setTitle(event.target.value)
    }
    const handleCategoryChange = (event:ChangeEvent<HTMLInputElement>)=>{
        setCategory(event.target.value)
    }
    const handlePostContentChange = (event:ChangeEvent<HTMLTextAreaElement>)=>{
        setPostContent(event.target.value)
    }
    const handleThemeChange = ()=>{
        setDarkMode(d=>!d)
       
    }



    const handleSave = () => {
        setPosts(p =>
            p.map(currentPost => {
                if (currentPost.id === post.id) {
                    return {
                        ...currentPost,
                        title: title,
                        category: category,
                        text: postContent
                    }
                }

                return currentPost
            })
        )

        navigate("/")
    }


    return (
           <div className={darkMode ? "app dark" : "app"}>
            <header>
                <button onClick={handleOpenMeno}><img src={menuIcon}></img></button>
                
                <button onClick={handleThemeChange}>
                    <div className={`theme-toggle ${darkMode ? "dark" : ""}`}>
                        <img className="sun" src={sun}></img>
                        <div className="circle"></div>
                        <img className="moon" src={moon}></img>
                    </div>
                </button>
                <button className="home-icon"><Link to="/"><img src={homeIcon}></img></Link></button>
            </header>

            <div className="home">
                 {openMenu&&(<div className="menu">
                        <h3 className="menu-titles">Posts</h3>
                        <ul className="menu-items">
                            {posts.map(p => (<li key={p.id}><Link to={`/read-post/${p.id}`}>{p.title}</Link></li>))}
                        </ul>
                        <h3 className="menu-titles">Categories</h3>
                        <ul className="menu-items">
                            {[...new Set(posts.map(post => post.category))].map(category => (
                                <li key={category}>
                                    
                                    <button
                                        className="category-button"
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </button>

                                    {openCategories.includes(category) && (
                                        <ul className="category-posts">
                                            {posts
                                                .filter(post => post.category === category)
                                                .map(post => (
                                                    <li key={post.id}>
                                                        <Link to={`/read-post/${post.id}`}>
                                                            {post.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}

                                </li>
                            ))}
                        </ul>
                        </div>)}

                        
                <div className="posts-container">
                    
                        <div className="post">
                            <label>Title: <input type="text" className="input-post-title" onChange={handleTitleChange} value={title} ></input></label>
                            <label>Category: <input type="text" className="input-post-category" value={category} onChange={handleCategoryChange} ></input></label>
                            <br></br>
                            <br></br>
                            <textarea  className="input-post-content" value={postContent} onChange={handlePostContentChange} ></textarea>
                            <br></br>
                            <br></br>
                            <button className="post-button" onClick={handleSave}>Save</button>
                            
                        </div>

                    
                    
                    
                </div>

               
                

            </div>

        </div>
    )
}

export default EditPost