import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import {Provider as ReduxProvider} from 'react-redux'
import { ThemeProvider } from './provider/ThemeProvider.tsx'
import { store } from './redux/store.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
       <ThemeProvider defaultTheme='dark'storageKey='vite-ui-theme'>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
    </ReduxProvider>
   
   
  </StrictMode>,
)
