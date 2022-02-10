import { MovieProps } from "../App"
import { Header } from "./Header"
import { MovieCard } from "./MovieCard"

type Props = {
  movies: MovieProps[]
  title: string
}

export function Content({ movies, title }: Props) {
  return (
    <main>
      <Header title={title} />

      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      </div>
    </main>
  )
}
