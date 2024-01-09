import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import logo from '../assets/react.svg'
import { routes } from './routes'


// Nota: El componente Suspense te permite mostrar una interfaz alternativa o fallback hasta que sus hijos hayan terminado de cargar.
function Loading() {
  return <h2>🌀 Loading...</h2>;
}


const Navigation = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <div className='main-layout'>
          <nav>
            <img src={logo} alt='react-logo' style={{paddingTop: '1rem'}} />

            <ul>
              { /* TODO: Crear un navlink dinámicos */}
              {
                routes.map((ruta, index) => (
                  <li key={`key-${index}-${ruta.to}`}>
                    <NavLink to={ruta.to} className={ ({ isActive }) => isActive ? 'nav-active' : '' }>{ruta.name}</NavLink>
                  </li>
                ))
              }
            </ul>

          </nav>

          <Routes>
            {
              routes.map((ruta, index) => (
                <Route key={`key-${index}-${ruta.to}`} path={ruta.path} element={<ruta.Component />} />
              ))
            }
            <Route path='/*' element={<Navigate to={routes[0].to} replace />} />
          </Routes>

        </div>
      </ BrowserRouter>
    </Suspense>
  )
}

export default Navigation