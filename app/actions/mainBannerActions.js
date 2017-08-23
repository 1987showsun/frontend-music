import axios from "axios";

export function mainBannerActions() {
  return function(dispatch) {
    dispatch({type: "FETCH_MAINBANNER"});
    axios.get("http://localhost:5000/kv")
      .then((response) => {

        dispatch({type: "FETCH_MAINBANNER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_MAINBANNER_REJECTED", payload: err})
      })
  }
}
