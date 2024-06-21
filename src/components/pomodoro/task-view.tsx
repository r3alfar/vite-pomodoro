import { EllipsisVertical, PencilIcon, Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Description } from "@radix-ui/react-dialog"
import { ScrollArea } from "../ui/scroll-area"
import TaskDialog from "./task-dialog"

const dummyData = ['aa', 'bb']

enum TaskType {
  DEFAULT = "default",
  CHECKLIST = "checklist"
}

const notifications = [
  {
    id: 1,
    title: "Your call has been confirmed.aaaaaaaaaaaa",
    description: "1 hour ago",
    isChecked: false
  },
  // {
  //   id: 2,
  //   title: "You have a new message!",
  //   description: "1 hour ago",
  // },
  // {
  //   id: 3,
  //   title: "Your subscription is expiring soon!",
  //   description: "2 hours ago",
  // },
  {
    id: 4,
    title: "Create Form",
    description: "useEffect hook",
    taskType: "default",
    isChecked: false
  },
  {
    id: 5,
    title: "backend setup",
    description: "checklist dont have descirption",
    taskType: "checklist",
    isChecked: false,
    checklistItems: [
      {
        id: 1,
        title: "POST",
        notes: "handle create item",
        isChecked: false
      },
      {
        id: 2,
        title: "PATCH",
        notes: "handle update item",
        isChecked: true
      },
      {
        id: 3,
        title: "DELETE",
        notes: "handle delete item",
        isChecked: false
      }
    ]

  }
]

function TaskView() {
  const [taskCounter, setTaskCounter] = useState(0)
  const [filteredItems, setFilteredItems] = useState(notifications)

  function deleteTask(id: number) {
    const filtered = filteredItems.filter(item => item.id !== id)
    console.log("filtered: ", filtered)
    setFilteredItems(filtered);
  }

  return (
    <div>
      <div
        className="flex h-5 items-center justify-evenly space-x-4 text-sm"
      >
        <p className="text-2xl">Tasks</p>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </div>
      {/* <Separator className="" /> */}
      <div className="mt-6 flex flex-col items-center space-y-4">
        <ScrollArea className="h-[350px]">
          {
            filteredItems.map((value) => (
              <Card className="w-[450px] mb-4" key={value.id}>
                <CardHeader>
                  <div className=" grid grid-cols-[auto,1fr]">
                    <div className="col-span-1 inline-flex mt-2 mr-2">
                      <Checkbox id={value.id.toString()} defaultChecked={value.isChecked} />
                    </div>
                    <div className="col-span-1 text-justify pt-1">
                      <p>tes2Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                  </div>
                  <p className="ml-4 text-start bg-yellow-200">outside div</p>
                </CardHeader>
                <CardContent>


                </CardContent>
              </Card>



              // <Card className="w-[400px] mb-4" key={value.id}>
              //   <CardHeader>
              //     <CardTitle className="flex justify-between">
              //       <div className="flex flex-wrap flex-grow-1">
              //         <p className="text-start text-wrap">{value.title}</p>
              //       </div>

              //       <div className="flex flex-row">
              //         <Button variant="ghost" size="sm" onClick={() => deleteTask(value.id)}>
              //           <Trash2Icon className="w-3 h-3" />
              //         </Button>
              //         <Button variant="ghost" size="sm">
              //           <PencilIcon className="w-3 h-3" />
              //         </Button>
              //       </div>
              //     </CardTitle>
              //   </CardHeader>
              //   <CardContent>
              //     {
              //       value.checklistItems ?
              //         value.checklistItems.map((item, index) => (
              //           <div key={item.id} className="flex flex-col mb-2">

              //             <div className="flex flex-row justify-start items-center">
              //               <Checkbox key={item.title} defaultChecked={item.isChecked} className="mr-2" />
              //               <div className="flex flex-col justify-start items-start">
              //                 <Label className="text-lg" htmlFor={item.title}>{item.title}</Label>
              //                 <Label htmlFor={item.notes}>{item.notes}</Label>
              //               </div>

              //             </div>
              //           </div>


              //         ))
              //         :

              //         <div className="flex items-center space-x-2">
              //           <Checkbox id={value.description} />
              //           <Label htmlFor="terms">{value.description}</Label>
              //         </div>
              //     }


              //   </CardContent>
              // </Card>
            ))

          }
        </ScrollArea>

        <Button className="w-[500px]" variant="outline">Add Task</Button>
        {/* <TaskDialog /> */}
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button className="w-[400px]" variant="outline">Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
              <DialogDescription>
                <i>What are you working on?</i>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  )
}

export default TaskView