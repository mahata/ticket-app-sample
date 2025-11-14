// frontend/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/AuthContext'
import ProtectedRoute from '@/ProtectedRoute'
import App from '@/App.tsx'
import MyPath from '@/MyPath.tsx'
import Login from '@/Login.tsx'
import NotFound from '@/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/my-path"
            element={
              <ProtectedRoute>
                <MyPath />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
