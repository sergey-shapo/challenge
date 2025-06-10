export type Track = {
  id: string;
  parent: string;
  isDir: boolean;
  title: string;
  album: string;
  artist: string;
  track: number;
  year: number;
  genre: string;
  coverArt: string;
  size: number;
  contentType: string;
  suffix: string;
  duration: number;
  bitRate: number;
  path: string;
  averageRating?: number;
  playCount: number;
  created: string;
  starred?: string;
  albumId: string;
  artistId: string;
  type: "music";
};

export interface Album {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverArt: string;
  songCount: number;
  duration: number;
  playCount: number;
  created: string;
  year: number;
  genre: string;
  song: Track[];
}

export interface TracksResponse {
  status: string;
  version: string;
  album: Album;
}
