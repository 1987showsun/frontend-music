import { combineReducers } from "redux";

import albumList            from './albumListReducer';
import songsList            from './songsListReducer';
import playList             from './playListReducer';
import login                from './loginReducer';
import collection           from './collectionReducer';
import audio                from './audioReducer';
import note                 from './noteReducer';
import artists              from './artistsReducer';
import area                 from './areaReducer';
import nav                  from './navReducer';
import mv                   from './mvReducer';
import allpage              from './allpage';
import lyrics               from './lyrics';
import index                from './index';
import chatReducer          from './chat';


export default combineReducers({
  albumList,
  songsList,
  playList,
  login,
  collection,
  audio,
  note,
  artists,
  area,
  nav,
  mv,
  allpage,
  lyrics,
  index,
  chatReducer
})
