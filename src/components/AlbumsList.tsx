import { useState, useEffect, useRef } from "react";
import useAxios from "../hooks/useAxios";
import type { Album, Subsonic } from "../types";
import AlbumCard from "./AlbumCard";
import AlbumTracksTable from "./AlbumTracksTable";

const AlbumsList = (): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [albums, setAlbums] = useState<Album[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const recentAlbumsUrl = `${baseUrl}/getAlbumList`;

  const albumListParams = {
    params: {
      u: "guest",
      p: "guest",
      v: "1.13.0",
      f: "json",
      c: "my-app",
      type: "recent",
    },
  };

  const { data, isLoading, error } = useAxios<Subsonic>(
    recentAlbumsUrl,
    albumListParams
  );

  useEffect(() => {
    if (data?.["subsonic-response"]?.albumList?.album) {
      setAlbums(data["subsonic-response"].albumList.album);
    }
  }, [data]);

  const nextAlbum = () => {
    setCurrentIndex((prev) => (prev + 1) % albums.length);
  };

  const prevAlbum = () => {
    setCurrentIndex((prev) => (prev - 1 + albums.length) % albums.length);
  };

  if (isLoading) return <p>Loading albums...</p>;
  if (error) return <p>Error loading albums: {error}</p>;
  if (!albums.length) return <p>No albums found</p>;

  return (
    <div className="albums-container">
      <div className="gallery-wrapper">
        <button onClick={prevAlbum} aria-label="Previous album">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="albums-viewport" ref={galleryRef}>
          <div
            className="albums-track"
            style={{
              transform: `translateX(calc(3% - ${currentIndex * 320}px))`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {albums.map((album, index) => (
              <div
                key={album.id}
                className={`album-wrapper ${
                  index === currentIndex ? "center" : ""
                }`}
              >
                <AlbumCard album={album} isSelected={index === currentIndex} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextAlbum} aria-label="Next album">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {albums[currentIndex] && (
        <AlbumTracksTable
          title={albums[currentIndex].title}
          albumId={albums[currentIndex].id}
        />
      )}
    </div>
  );
};

export default AlbumsList;
