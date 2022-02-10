import { useEffect, useState } from "react"

import { SideBar } from "./components/SideBar"
import { Content } from "./components/Content"

import { api } from "./services/api"

import "./styles/global.scss"

import "./styles/sidebar.scss"
import "./styles/content.scss"
import { Header } from "./components/Header"

export type GenreResponseProps = {
  id: number
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family"
  title: string
}

export type MovieProps = {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1)

  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  )

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data)
      })

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data)
      })
  }, [selectedGenreId])

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="container">
        <SideBar
          onChangeGenre={(id: number) => setSelectedGenreId(id)}
          genres={genres}
        />
        <Content title={selectedGenre.title} movies={movies} />
      </div>
    </div>
  )
}
