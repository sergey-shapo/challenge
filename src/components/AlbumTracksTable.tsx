import useAxios from "../hooks/useAxios";
import type { Track } from "../types/tabletype";

interface AlbumTracksTableProps {
  title: string;
  albumId: string;
}
const AlbumTracksTable = ({
  title,
  albumId,
}: AlbumTracksTableProps): React.ReactElement => {
  const baseUrl = "http://demo.subsonic.org/rest";
  const albumTracksUrl = `${baseUrl}/getAlbum`;

  const albumTracksParams = {
    params: {
      id: albumId,
      u: "guest",
      p: "guest",
      v: "1.16.1",
      f: "json",
      c: "my-MyReactApp",
    },
  };

  const { data, isLoading } = useAxios<any>(albumTracksUrl, albumTracksParams);
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  const songs = data?.["subsonic-response"]?.album?.song;

  return (
    <div className="border-black">
      <h1 className="title">{title}</h1>
      {songs?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Track</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song: Track, i: number) => (
              <tr key={song.id}>
                <td>{i + 1}</td>
                <td>{song.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No songs found</p>
      )}
    </div>
  );
};

export default AlbumTracksTable;
