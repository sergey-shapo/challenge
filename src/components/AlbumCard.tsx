import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import type { Album } from "../types";

interface AlbumCardProps {
  album: Album;
  isSelected: boolean;
}

const AlbumCard = ({
  album,
  isSelected,
}: AlbumCardProps): React.ReactElement => {
  const baseUrl = "http://demo.subsonic.org/rest";
  const coverImageUrl = `${baseUrl}/getCoverArt`;

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const coverParams = {
    params: {
      id: album.id,
      u: "guest",
      p: "guest",
      v: "1.16.1",
      c: "MyReactApp",
      f: "json",
      size: 150,
    },
    responseType: "arraybuffer" as const,
  };

  const { data } = useAxios<ArrayBuffer>(coverImageUrl, coverParams);

  useEffect(() => {
    if (data) {
      const blob = new Blob([data], { type: "image/jpeg" });
      const objectUrl = URL.createObjectURL(blob);
      setImageSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [data]);

  return (
    <li key={album.id} className={isSelected ? "" : "not-selected"}>
      {imageSrc && <img src={imageSrc} alt={album.title} />}
    </li>
  );
};

export default AlbumCard;
