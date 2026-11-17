import { useState } from "react";

import type { SharedProps,Post } from "./types";
import type { Dispatch,SetStateAction } from "react";

import { Link } from "react-router-dom";

import miniSearchIcon from "./assets/miniSearch.png"
import menuIcon from "./assets/menu3.png" 
import searchIcon from "./assets/search4.png" 
import newPostIcon from "./assets/new1.png" 
import sun from "./assets/sun3.png" 
import moon from "./assets/moon.png" 
import homeIcon from "./assets/home.png"


interface BlogProps extends SharedProps{
    setPosts: Dispatch<SetStateAction<Post[]>>;
}

function Blog({darkMode, setDarkMode,posts,setPosts}:BlogProps){
    
    

    const [openCategories, setOpenCategories] = useState<string[]>([])
    /*برای مدیریت یه دکمه که با کلیک یه سایدبار بازشه*/
    const[openMenu,setOpenMenu] = useState<boolean>(false)
    const[search,setSearch] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")




    const handleCategoryClick = (category:string):void => {
    setOpenCategories(c =>
        c.includes(category)
            ? c.filter(c => c !== category)
            : [...c, category]
    )
    }

    const handleOpenMeno = ():void=>{
        setOpenMenu(o => !o)

    }
    const handleSearch = ():void=>{
        setSearch(s=>!s)
    }
    const handleThemeChange = ():void=>{
        setDarkMode(d=>!d)
       
    }
    
    const handleDelete =(id:number):void=>{
        setPosts(p=>p.filter(post=>post.id!==id))

    }

    


    const searchResults:Post[] = posts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.text.toLowerCase().includes(searchText.toLowerCase()) ||
        post.category.toLowerCase().includes(searchText.toLowerCase())
    )
   
    
    return(
        <div className={darkMode ? "app dark" : "app"}>
            <header>
                <button onClick={handleOpenMeno}><img src={menuIcon}></img></button>
                <button onClick={handleSearch}><img src={searchIcon}></img></button>
                <button><Link to="/new-post"><img src={newPostIcon}></img></Link></button>
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
                    {search && (
                                <div className="search-box">

                                    <input
                                        type="text"
                                        className="input-search"
                                        value={searchText}
                                        onChange={e => setSearchText(e.target.value)}
                                    />

                                    <button className="mini-search-button">
                                        <img src={miniSearchIcon} />
                                    </button>

                                    {searchText && (
                                        <div className="search-results">

                                            {searchResults.length > 0 ? (
                                                searchResults.map(post => (
                                                    <Link
                                                        key={post.id}
                                                        to={`/read-post/${post.id}`}
                                                        className="search-result"
                                                    >
                                                        <span>{post.title}</span>
                                                        <small>{post.category}</small>
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="no-results">
                                                    No posts found.
                                                </p>
                                            )}

                                        </div>
                                    )}

                                </div>
                            )}          
                    
                    {posts.length > 0 && posts.map(post => 
                    (
                        <div className="post" key={post.id}>
                            <h4 className="post-title">{post.title} <span className="post-category">{post.category}</span></h4>
                            
                            <p className="post-content">{post.text.slice(0, 120)}...</p>
                            
                            <div className="post-button-container">
                                <button className="post-button"><Link to={`/read-post/${post.id}`}>read more</Link></button>
                                <button className="post-button"><Link to={`/edit-post/${post.id}`}>Edit</Link></button>
                                <button className="post-button" onClick={()=>handleDelete(post.id)}>Delete</button>
                            </div>
                        </div>
                    )
                    )
                    }
                    
                </div>

               
                

            </div>

        </div>
    )
}
export default Blog