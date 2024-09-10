import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { useState } from 'react'

import GameScreen from './components/gamescreen'
import Root from './components/root'
import Homepage from './components/homepage'
import Cursor from './components/cursor'

function App() {

  const [gameState, setGameState] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root gameState={gameState} handleClick={setGameState}/>}>
        <Route index element={<Homepage handleClick={setGameState}/> } />
        <Route path="gamescreen" element={<GameScreen /> } />
      </Route>
    )
  );

  return (
    <>
      <Cursor />
      <RouterProvider router={router} />

    </>
  )
}

export default App
