import React from 'react'
import{ useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './Layout/LayOut'
import UserList from './userList/UserList'
import UserInfo from './userInfo/UserInfo';
UserInfo


function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Layout><UserList/></Layout>} />
              <Route path='/user/:id' element={<Layout><UserInfo/></Layout>}/>
          </Routes>
      </Router>
  );
}

export default App
