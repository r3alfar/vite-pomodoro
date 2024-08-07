import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import googleLogo from './assets/google-logo.svg'
import './App.css'
import { Button } from './components/ui/button'
import PomoSelector from './components/pomodoro/pomo-selector'
import TaskView from './components/pomodoro/task-view'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''>
        <PomoSelector />
      </div>
      <div>
        <TaskView />
      </div>
      <div className='flex flex-row justify-center mt-4'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href='https://google.com' target='_blank'>
          <img src={googleLogo} className='logo google' alt='Google Logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
