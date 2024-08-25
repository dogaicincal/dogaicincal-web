import { ArtistModel } from "./artist.model";
import { VideoModel } from "./video.model";

export class DicModel {
    code!: string;
    name!: string;
    year!: string;
    director!: string;

    song!: Array<string>;
    video!: VideoModel;
    artist!: Array<ArtistModel>;
}