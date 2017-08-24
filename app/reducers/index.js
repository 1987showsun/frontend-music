import { combineReducers } from "redux";

import mainBanner   from './mainBannerReducer';
import hitoAlbum    from './hitoAlbumReducer';
import albumList    from './albumListReducer';
import songsList    from './songsListReducer';
import playList     from './playListReducer';
import login        from './loginReducer';

export default combineReducers({
  mainBanner,
  hitoAlbum,
  albumList,
  songsList,
  playList,
  login
})
