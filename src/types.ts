import type { Dispatch, SetStateAction } from "react";

export interface Post {
  title: string;
  text: string;
  category: string;
  id: number;
}

export interface SharedProps{
  posts:Post[];
  darkMode:boolean;
  setDarkMode:Dispatch<SetStateAction<boolean>>

}




