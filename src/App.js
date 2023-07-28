import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import "./styles/App.css";

import Main from './pages/Main';
import MyBucketList from './pages/MyBucketList';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MyBucketList />}></Route>
        <Route path='/createbucket' element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;