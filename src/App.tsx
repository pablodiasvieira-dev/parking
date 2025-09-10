import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BaseLayout,  LayoutApp,  LayoutBemVindo, LayoutEntrada } from './components/Layout/Layout';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<BaseLayout />}>
            <Route index element={<LayoutBemVindo />} />
            <Route path='entrar' element={<LayoutEntrada />} />
            <Route path='app' element={<LayoutApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
