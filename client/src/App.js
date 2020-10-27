import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Chat from './component/chat/Chat';
import Join from './component/join/Join';

const App=()=>(
    <BrowserRouter>
    <Route path="/" exact component={Join}></Route>
    <Route path="/chat"  component={Chat}></Route>
    </BrowserRouter>
);

export default App;
