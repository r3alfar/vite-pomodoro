import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useEffect, useRef, useState } from "react"
import { Progress } from "../ui/progress"

// import { Flat } from '@alptugidin/react-circular-progress-bar'

enum TimerType {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'short_break',
  LONG_BREAK = 'long_break'
}


function PomoSelector() {

  const [timerType, setTypeTimer] = useState(TimerType.POMODORO)
  const [initialSeconds, setInitialSeconds] = useState(60)
  const [initialMinutes, setInitialMinutes] = useState(Math.floor(initialSeconds / 60))
  const [seconds, setSeconds] = useState(initialSeconds % 60)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [isActive, setIsActive] = useState(false)
  const [timePercentage, setTimePercentage] = useState(100)
  const [timePassed, setTimePassed] = useState(initialSeconds)
  const audioRef = useRef(null)

  function onChangeTimerType(value: TimerType) {
    // console.log("before: ", timerType)
    setTypeTimer(value)

  }

  // useEffect(() => {
  //   console.log("side effect run")
  //   let interval = undefined;
  //   if (isActive) {
  //     console.log("interval active", seconds)
  //     interval = setInterval(() => {
  //       setSeconds((seconds) => seconds - 1)
  //     }, 1000)
  //   }
  //   else if (!isActive && seconds !== 0) {
  //     clearInterval(interval)
  //     console.log("interval finished")
  //   }

  //   if (seconds === 0) {
  //     clearInterval(interval)
  //   }
  //   return () => clearInterval(interval)
  // }, [timerType, isActive, seconds])

  useEffect(() => {
    let thisInterval: number | Timer | undefined = undefined;
    if (isActive && minutes >= 0) {
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

    else if (!isActive && seconds !== 0) {
      clearInterval(undefined)
      // setSeconds(seconds);
      // setMinutes(minutes)
      console.log("interval finished")
    }

    return () => {
      clearInterval(thisInterval)
    }
  }, [isActive, seconds, minutes, timePassed, timePercentage])

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

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `
  //     ${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}
  //   `
  // }

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
        <Button variant="secondary" onClick={() => resetTime()}>Stop</Button>
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