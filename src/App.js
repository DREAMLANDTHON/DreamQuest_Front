import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import "./styles/App.css";

import Main from './pages/Main';
import MyBucketList from './pages/MyBucketList';
import Question from './pages/Question';
import MakedreamList from './pages/MakeDreamList';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MyBucketList />}></Route>
        <Route path='/createbucket' element={<Main />}></Route>
        <Route path='/question' element={<Question />} />
        <Route path='/makedreamlist' element={<MakedreamList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;