import { useState, useEffect, useRef } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import PrivateRoute from './components/privateroute';
import Root from './components/root';
import Homepage from './components/homepage';
import GameScreen from './components/gamescreen';
import Cursor from './components/cursor';
import Leaderboard from './components/leaderboard';

function App() {
  const [gameState, setGameState] = useState(false);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [timer, setTimer] = useState(0);
  const [game, setGame] = useState({});
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      if (gameState) {
        // Game is starting
        fetch('http://localhost:3000/api/maps/1/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        .then(response => response.json())
        .then(data => {
          setGame(data.game);
          console.log('Game started: ', data.game);
        })
        .catch(error => console.log('Error starting game:', error));
      } else {
        // Game is stopping
        if (game.id) {
          fetch('http://localhost:3000/api/maps/1/stop', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ gameId: game.id }),
          })
          .then(response => response.json())
          .then(data => {
            const startedAt = new Date(data.game.startedAt).getTime();
            const endedAt = new Date(data.game.endedAt).getTime();
            const timeDifferenceInSeconds = (endedAt - startedAt) / 1000;
            setTimer(timeDifferenceInSeconds);
            setGame(data.game);
            console.log('Game ended. Total time:', timeDifferenceInSeconds);
          })
          .catch(error => console.log('Error stopping game:', error));
        }
      }
    } else {
      isMounted.current = true;
    }
  
    // Cleanup function to ensure we don't have pending state changes
    return () => {
      setGame({});
      setTimer(0);
    };
  }, [gameState, token]);
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setToken={setToken} setUser={setUser} />} />
        <Route element={<PrivateRoute token={token} user={user}/>} >
          <Route path="/" element={<Root gameState={gameState} setGameState={setGameState} handleClick={setGameState} foundCharacters={foundCharacters} characters={characters} setFoundCharacters={setFoundCharacters} token={token} user={user} timer={timer}/>}>
            <Route index element={<Homepage handleClick={setGameState}/> } />
            <Route path="gamescreen" element={<GameScreen setCharacters={setCharacters} setFoundCharacters={setFoundCharacters} foundCharacters={foundCharacters}/> } />
            <Route path='/leaderboard'  element={<Leaderboard token={token} />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
    <Cursor />
    <RouterProvider router={router} />
    </>
  );
}

export default App;