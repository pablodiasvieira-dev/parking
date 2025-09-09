import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Garagens from './modules/View/Garagens';
import { Login } from './modules/Login/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index path='garagens' element={<Garagens />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
