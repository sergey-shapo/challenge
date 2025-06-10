export interface Subsonic {
  "subsonic-response": SubsonicResponse;
}

export interface SubsonicResponse {
  status: string;
  version: string;
  albumList: AlbumList;
}

export interface AlbumList {
  album: Album[];
}

export interface Album {
  id: string;
  parent: string;
  isDir: boolean;
  title: string;
  album: string;
  artist: string;
  year?: number;
  genre: string;
  coverArt: string;
  playCount: number;
  created: Date;
  starred?: Date;
  userRating?: number;
  averageRating?: number;
}
