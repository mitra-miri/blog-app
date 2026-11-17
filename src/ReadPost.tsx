import {useState} from "react"
import { Link,useParams } from "react-router-dom";


import menuIcon from "./assets/menu3.png" 

import sun from "./assets/sun3.png" 
import moon from "./assets/moon.png" 
import homeIcon from "./assets/home.png"

import type{ SharedProps } from "./types";



function ReadMore({darkMode, setDarkMode,posts}:SharedProps){
    
    const { id } = useParams();
    const post = posts.find(post => post.id === Number(id));
    

  
    const [openCategories, setOpenCategories] = useState<string[]>([])
    /*برای مدیریت یه دکمه که با کلیک یه سایدبار بازشه*/
    const[openMenu,setOpenMenu] = useState(false)
    

    if(!post){return (<p>Post not found.</p>);}

    const handleOpenMeno = ()=>{
        setOpenMenu(o => !o)

    }
    const handleCategoryClick = (category:string) => {
    setOpenCategories(c =>
        c.includes(category)
            ? c.filter(c => c !== category)
            : [...c, category]
    )}

    
    const handleThemeChange = ()=>{
       setDarkMode(d=>!d)
    }
    
    
   
    
    return(
        <div className={darkMode ? "app dark" : "app"} >
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

                        
                        <h4 className="post-title">{post.title} <span className="post-category">{post.category}</span></h4>
                        
                        <p className="post-content">{post.text}</p>
                        
                    </div>
                    
                </div>

            </div>

        </div>
    )
}
export default ReadMore