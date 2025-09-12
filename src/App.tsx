import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BaseLayout, LayoutApp, LayoutBemVindo, LayoutEntrada } from './components/Layout/Layout';
import { ThemeProvider } from './components/theme-provider';
// import { useAuth } from './db/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { useEffect } from 'react';
import { listenToAuthChanges } from './redux/authSlice';
import { Skeleton } from './components/ui/skeleton';
import { PrivateRoute } from './Routes/PrivateRoute';

function App() {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)

  useEffect(() => {
    dispatch(listenToAuthChanges())
  }, [dispatch])

  if(isLoading) {
    return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='w-full, h-full flex justify-center items-center bg-background '>
          <SkelectonInit />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<BaseLayout />}>
              <Route index element={user ? <Navigate to="/app" replace /> : <LayoutBemVindo />} /> 

              <Route path='entrar' element={<LayoutEntrada />} />

              <Route path='app' element={
                <PrivateRoute> 
                  <LayoutApp user={user} />
                </PrivateRoute>
                } />

            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App


export function SkelectonInit() {
  return (
    <div>
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    </div>
  )
}