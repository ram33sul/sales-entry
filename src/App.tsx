import './App.css'
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import Home from "./pages/Home";
import { Route, Navigate, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
};

export default App;
