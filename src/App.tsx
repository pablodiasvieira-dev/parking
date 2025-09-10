import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, LayoutApp, LayoutEntrada } from './components/Layout/Layout';
import Garagens from './modules/View/Garagens';
import { Login } from './modules/Entrada/Login/Login';
import { BemVindo } from './modules/Entrada/BemVindo';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutApp />}>
            <Route index element={<BemVindo />} />
          </Route>
          <Route path='entrar' element={<LayoutEntrada />}>
            <Route index element={<Login />} />
          </Route>
          <Route path='app' element={<Layout />}>
            <Route index element={<Garagens />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
