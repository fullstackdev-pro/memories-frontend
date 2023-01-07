import { combineReducers } from "redux";

import posts from "./posts";
import state from './auth'

export default combineReducers({ posts, state });
