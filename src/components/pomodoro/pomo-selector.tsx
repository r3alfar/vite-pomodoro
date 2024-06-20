import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useEffect, useRef, useState } from "react"
import { Progress } from "../ui/progress"
// import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

// import { Flat } from '@alptugidin/react-circular-progress-bar'

enum TimerType {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short_break',
  LONG_BREAK = 'long_break'
}

const TimerTypeProperties = {
  [TimerType.POMODORO]: {
    defaultSeconds: 15
  },
  [TimerType.SHORT_BREAK]: {
    defaultSeconds: 10
  },
  [TimerType.LONG_BREAK]: {
    defaultSeconds: 5
  }
}


function PomoSelector() {
  const enumTimerType = Object.entries(TimerType);
  const [timerType, setTypeTimer] = useState(TimerType.POMODORO)
  const [initialSeconds, setInitialSeconds] = useState(TimerTypeProperties[TimerType.POMODORO].defaultSeconds)
  const [initialMinutes, setInitialMinutes] = useState(Math.floor(initialSeconds / 60))
  const [seconds, setSeconds] = useState(initialSeconds % 60)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [isActive, setIsActive] = useState(false)
  const [timePercentage, setTimePercentage] = useState(100)
  const [timePassed, setTimePassed] = useState(initialSeconds)
  const audioRef = useRef(null)
  let thisInterval: number | Timer | undefined = undefined;


  //BUAT HANDLE COUNTDOWN
  useEffect(() => {
    function handleTimer() {
      // console.log("interval active", seconds)
      setTimePercentage((timePassed / initialSeconds) * 100)
      thisInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {

            // console.log("SUPPOSED TO CLOSE/////////////////////////////////////////////////////////////////////////////")
            clearInterval(thisInterval)
            setMinutes(Math.floor(initialSeconds / 60))
            setSeconds(initialSeconds % 60)
            setIsActive(false)
            setTimePercentage(100)
            setTimePassed(initialSeconds)
            return;
          }
          else {
            setMinutes((minutes) => minutes - 1)
            setSeconds(59)
          }
        }
        // to calculate percentage
        setTimePassed(timePassed - 1)
        // console.log("timepassed: ", timePassed)
        // setTimePercentage((timePassed / initialSeconds) * 100)
        // console.log("timePercentage: ", timePercentage)
      }, 1000)
    }


    if (isActive && minutes >= 0) {
      handleTimer()
    }

    else if (!isActive && seconds !== 0) {
      clearInterval(thisInterval)
      // setSeconds(seconds);
      // setMinutes(minutes)
      console.log("interval finished")
    }

    return () => {
      clearInterval(thisInterval)
    }
  }, [isActive, seconds, minutes, timePassed, timePercentage])

  function onChangeTimerType(value: TimerType) {
    // console.log("before: ", timerType)
    setTypeTimer(value)
    if (isActive && minutes >= 0) {
      console.log("override dan ganti tipe: ", value)
      setIsActive(false)
      clearInterval(thisInterval)
      //hydrate timer data
      const defaultSeconds = TimerTypeProperties[value].defaultSeconds
      setInitialSeconds(defaultSeconds)
      setMinutes(Math.floor(defaultSeconds / 60))
      setSeconds(defaultSeconds % 60)
      setTimePercentage(100)
      setTimePassed(defaultSeconds)
    }
    else {
      const defaultSeconds = TimerTypeProperties[value].defaultSeconds
      setInitialSeconds(defaultSeconds)
      setMinutes(Math.floor(defaultSeconds / 60))
      setSeconds(defaultSeconds % 60)
      setTimePercentage(100)
      setTimePassed(defaultSeconds)
    }
  }

  const toggleTime = () => {
    setIsActive(!isActive)
  }

  const resetTime = () => {
    setMinutes(Math.floor(initialSeconds / 60))
    setSeconds(initialSeconds % 60)
    setIsActive(false)
    setTimePercentage(100)
    setTimePassed(initialSeconds)

  }


  const formatTime = () => {

    if (minutes === 0 && seconds === 0) {
      return (`${minutes}0:${seconds}0`)
    }
    else {
      // const scd = `0${seconds}`
      let as: string;
      if (seconds < 10) {
        as = `0${seconds}`
      } else {
        as = seconds.toString()
      }

      let am: string;
      if (minutes < 10) {
        am = `0${minutes}`
      } else {
        am = minutes.toString()
      }

      return (`${am}:${as}`)
    }
    // minutes === 0 && seconds === 0 ? 
    //   return (<h3>{minutes}:{seconds}</h3>) :
    //   return (<h3>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>)
  }



  return (
    <div
      className="mt-4"
    >
      <div className='mb-4'>
        <Progress value={timePercentage} />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center justify-center space-x-4 text-sm">

        {/* <Tabs defaultValue={TimerType.POMODORO}>
          <TabsList>
            {
              enumTimerType.map(([key, value]) => (
                <TabsTrigger key={value} value={value} onClick={() => onChangeTimerType(value)} >{key}</TabsTrigger>
              ))
            }
          </TabsList>
        </Tabs> */}

        <div>

          <Button onClick={() => onChangeTimerType(TimerType.POMODORO)} variant="ghost">
            Pomodoro
          </Button>

        </div>
        <Separator orientation="vertical" />
        <div>
          <Button onClick={() => onChangeTimerType(TimerType.SHORT_BREAK)} variant="ghost">
            Short Break
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div>
          <Button onClick={() => onChangeTimerType(TimerType.LONG_BREAK)} variant="ghost">
            Long Break
          </Button>
        </div>
      </div>

      <div
        className="grid place-items-center max-h-[300px] max-w-[300px] h-[300px] w-[300px] mx-auto mt-8"
      >
        <CircularProgressbar value={timePercentage} text={formatTime()} />
      </div>
      <div className="flex flex-row justify-center mb-6">
        <Button variant="secondary" onClick={() => toggleTime()} >{isActive ? 'Pause' : 'Start'}</Button>
        <Button variant="secondary" onClick={() => resetTime()}>Reset</Button>
      </div>
      <div>
        {/* <p>{formatTime(1500)}</p> */}
        {
          minutes === 0 && seconds === 0 ? <h3>{minutes}:{seconds}</h3> :
            <h3>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
        }
      </div>



    </div>
  )
}

export default PomoSelector