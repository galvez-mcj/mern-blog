import './App.css';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create';
import BlogDetails from './pages/BlogDetails';
import Edit from './pages/Edit';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<BlogDetails />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
