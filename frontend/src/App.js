// routing
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from "./components/LoginPage/LoginPage";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import MovieListPage from "./components/MovieListPage/MovieListPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import MyPage from "./components/MyPage/MyPage";
import RecommendPage from './components/RecommendPage/RecommendPage';
import './App.css'

function App() {
  return (
    <div id="main">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/movie" component={MovieListPage} />
          <Route exact path="/movie/:movieId" component={MovieDetail} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/recommend" component={RecommendPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;