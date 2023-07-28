import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import "./styles/App.css";

import Main from './pages/Main';
import MyBucketList from './pages/MyBucketList';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/mybucket' element={<MyBucketList />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;