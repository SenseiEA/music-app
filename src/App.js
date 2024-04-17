import "./styles.css";
import "./App.css";
import { useState } from "react";
const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "BINI",
    genre: "Pop",
    userRating: 4.5,
  },
  {
    id: 2,
    title: "Alam mo ba girl",
    artist: "Hev Abi",
    genre: "Hip-hop",
    userRating: 3.9,
  },
  {
    id: 3,
    title: "If I can stop one heart from breaking",
    artist: "HOYO-MIX ft. chevy",
    genre: "Pop",
    userRating: 4.8,
  },
  {
    id: 4,
    title: "morning coffee",
    artist: "chevy and Naiba",
    genre: "Folk",
    userRating: 4.9,
  },
  {
    id: 5,
    title: "WHITE NIGHT",
    artist: "Jake Miller",
    genre: "Pop rock",
    userRating: 4.7,
  },
  {
    id: 6,
    title: "Hey Jude",
    artist: "The Beatles",
    genre: "Pop Rock",
    userRating: 4.8,
  },
  {
    id: 7,
    title: "Wildfire",
    artist: "HOYO-MIX ft. Jonathan Steingard",
    genre: "Metal rock",
    userRating: 4.6,
  },
  {
    id: 8,
    title: "La Vaguelette",
    artist: "HOYO-MIX ft. Cecilia Cara",
    genre: "Opera",
    userRating: 4.7,
  },
];
const tempPlaylist = [
  {
    id: 9,
    title: "Lost in the Echo",
    artist: "Echoes of Tomorrow",
    genre: "Alternative Rock",
    userRating: 4.8,
  },

  {
    id: 10,
    title: "Dark Symphony",
    artist: "Midnight Shadows",
    genre: "Symphonic Metal",
    userRating: 4.5,
  },

  {
    id: 11,
    title: "Fire Dance",
    artist: "Inferno Beats",
    genre: "EDM",
    userRating: 4.3,
  },

  {
    id: 12,
    title: "Rising Phoenix",
    artist: "Phoenix Rising",
    genre: "Hard Rock",
    userRating: 4.7,
  },

  {
    id: 13,
    title: "Echoes of Time",
    artist: "Temporal Soundscapes",
    genre: "Ambient",
    userRating: 4.6,
  },

  {
    id: 14,
    title: "Neon Nights",
    artist: "Synthwave Dreams",
    genre: "Synthwave",
    userRating: 4.9,
  },
];
function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [query, setQuery] = useState("");

  const handleFavorite = (id) => {
    const favoriteMusicList = music.map((music) =>
      music.id === id ? { ...music, favorite: !music.favorite } : music
    );
    setMusic(favoriteMusicList);
    const favoriteMusic = music.find((music) => music.id === id);
    if (favoriteMusic.favorite) {
      if (!playlist.some((music) => music.id === id)) {
        setPlaylist((oldPlayList) => [...oldPlayList, favoriteMusic]);
      }
    } else {
      setPlaylist((oldPlayList) =>
        oldPlayList.filter((music) => music.id !== id)
      );
    }
  };

  const handleSort = () => {
    const sortedPlaylist = [...playlist].sort(
      (a, b) => b.userRating - a.userRating
    );
    setPlaylist(sortedPlaylist);
  };

  return (
    <div>
      <>
        <NavBar>
          <Logo />
        </NavBar>
        <NavBar> </NavBar>
        <NavBar>
          {" "}
          <Result music={music} />
        </NavBar>
      </>
      <>
        <Main>
          <Box title="Song List">
            <Search
              query={query}
              setQuery={setQuery}
              music={music}
              handleFavorite={handleFavorite}
            />
          </Box>
          <Box title="Play List">
            <button className="button " onClick={handleSort}>
              Sort by Rating
            </button>
            <PlayList playlist={playlist} />
          </Box>
        </Main>
      </>
    </div>
  );
}
export default App;
//structural
function NavBar({ children }) {
  return <nav className="container headerText">{children}</nav>;
}
function Main({ children }) {
  return <div className="container">{children}</div>;
}

function Box({ children, title }) {
  return (
    <div className="container">
      <h2 className=" mainText">{title}</h2>
      {children}
    </div>
  );
}

//stateless
function Logo() {
  return <h1 style={{ textAlign: "center" }}> Stopify</h1>;
}
function Result({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}

//stateful
function Search({ query, setQuery, music, handleFavorite }) {
  const filteredQuery = music.filter((music) => {
    return (
      music.title.toLowerCase().includes(query.toLowerCase()) ||
      music.artist.toLowerCase().includes(query.toLowerCase())
    );
  });
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <section>
      <input
        className="search"
        type="text"
        placeholder="Search music..."
        value={query}
        onChange={handleChange}
      />
      <ScrollList>
        <SearchList
          filteredQuery={filteredQuery}
          handleFavorite={handleFavorite}
        />
      </ScrollList>
    </section>
  );
}
function ScrollList({ children }) {
  return <div style={{ overflow: "scroll", height: "70vh" }}>{children}</div>;
}

function SearchList({ filteredQuery, handleFavorite }) {
  const filtered = <Music music={filteredQuery} onFavorite={handleFavorite} />;
  return <div className="query">{filtered}</div>;
}

function Music({ music, onFavorite }) {
  return (
    <ul>
      {music.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist} ({music.genre})
          <button onClick={() => onFavorite(music.id)}>
            {music.favorite ? "🖤" : "❤️"}
          </button>
        </li>
      ))}
    </ul>
  );
}
function PlayList({ playlist }) {
  return (
    <ul className="playlist">
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <span> ★</span>
          <span> {music.userRating}</span>
        </li>
      ))}
    </ul>
  );
}

//stateless/ presentational component - just for presentations
//stateful component
//structural component - templates/structures
