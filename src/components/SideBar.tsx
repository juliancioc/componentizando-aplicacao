import { useState } from "react"
import { GenreResponseProps } from "../App"

import { Button } from "./Button"

export type Props = {
  genres: GenreResponseProps[]
  onChangeGenre: (id: number) => void
}

export function SideBar({ genres, onChangeGenre }: Props) {
  const [selectedGenreId, setSelectedGenreId] = useState(1)

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
    onChangeGenre(id)
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}
