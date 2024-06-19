import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

// import { Flat } from '@alptugidin/react-circular-progress-bar'



function PomoSelector() {
  return (
    <div
    // className="relative z-20"
    >
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center justify-center space-x-4 text-sm">
        <div>

          <Button variant="ghost">
            Pomodoro
          </Button>

        </div>
        <Separator orientation="vertical" />
        <div>
          <Button variant="ghost">
            Short Break
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div>
          <Button variant="ghost">
            Long Break
          </Button>
        </div>
      </div>

      <div
        className="grid place-items-center max-h-[300px] max-w-[300px] h-[300px] w-[300px] mx-auto mt-8"
      >
        <CircularProgressbar value={62} text={`${62}%`} />
      </div>



    </div>
  )
}

export default PomoSelector