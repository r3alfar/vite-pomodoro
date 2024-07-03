import { EllipsisVertical, PencilIcon, Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Dispatch, EventHandler, SetStateAction, createContext, useContext, useState } from "react"
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
import { cn } from "@/lib/utils"

// framer motion
import { Reorder } from "framer-motion"

const dummyData = ['aa', 'bb']

enum TaskType {
  DEFAULT = "default",
  CHECKLIST = "checklist"
}

type TasksContextType = {
  filteredItems: TasksList[],
  setFilteredItems: Dispatch<SetStateAction<TasksList[]>>
}

export type TasksList = {
  id: number;
  title: string;
  description?: string;
  taskType: "default" | "checklist";
  isChecked?: boolean;
  checklistItems?: checklistItemsType[]
}

export type checklistItemsType = {
  id: number,
  title: string,
  notes?: string,
  isChecked: boolean,
}

const notifications: TasksList[] = [
  {
    id: 1,
    title: "Your call has been confirmed.aaaaaaaaaaaa",
    description: "1 hour ago",
    taskType: "default",
    isChecked: false,
  },
  {
    id: 2,
    title: "You have a new message!",
    description: "1 hour ago",
    taskType: "default",
    isChecked: true,
  },
  {
    id: 3,
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
    taskType: "default",
    isChecked: true,
  },
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

const listItems = [
  { name: "Michael Jordan", id: 1, isChecked: true, },
  { name: "Kobe Bryant", id: 2, isChecked: false, },
  { name: "LeBron James", id: 3, isChecked: false, },
  { name: "Magic Johnson", id: 4, isChecked: true, }
];

export const TasksContext = createContext<TasksContextType>({
  filteredItems: [],
  setFilteredItems: () => { },
})

export const useTasksContext = () => useContext(TasksContext)


function TaskView() {
  const [taskCounter, setTaskCounter] = useState(0)
  // const [filteredItems, setFilteredItems] = useState(notifications)
  const [filteredItems, setFilteredItems] = useState<TasksList[]>([])
  const [cobaListItem, setCobaListItem] = useState(listItems)
  const [validate, setValidate] = useState(false)

  function handleCheckedChange() {
    // console.log("submitted value: ", JSON.stringify(cobaListItem, null, 2))
    console.log("submitted value: ", JSON.stringify(filteredItems, null, 2))
    setValidate(true)
  }

  function handleItemCheckbox(id: number) {
    // const updated = cobaListItem.map(item => {
    //   item.id === id ? item.isChecked = !item.isChecked : item
    // })
    setCobaListItem(cobaListItem => cobaListItem.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ))
  }

  function handleDefaultChecklist(id: number) {
    setFilteredItems(filteredItems => filteredItems.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    ))
  }

  function handleMultiChecklist(itemId: number, checklistId: number) {

    setFilteredItems(filteredItems => filteredItems.map((item) =>
      item.id === itemId && item.checklistItems ?
        {
          ...item,
          checklistItems: item.checklistItems.map((list) =>
            list.id === checklistId ? { ...list, isChecked: !list.isChecked }
              : list
          )
        }
        : item
    )
    )

  }

  function isAllChecklistTrue(id: number) {
    const item = filteredItems.find(item => item.id === id)
    return item?.checklistItems?.every(x => x.isChecked === true)
  }

  function isPartlyChecklistTrue(id: number) {
    const item = filteredItems.find(item => item.id === id)
    return item?.checklistItems?.some(x => x.isChecked === true)
  }

  function isItemCompleted(item: any) {
    if (!item.checklistItems && item.isChecked) {
      return true
    } else {
      return isAllChecklistTrue(item.id)
    }
  }

  function deleteTask(id: number) {
    const filtered = filteredItems.filter(item => item.id !== id)
    console.log("filtered: ", filtered)
    setFilteredItems(filtered);
  }

  return (
    <TasksContext.Provider value={{ filteredItems, setFilteredItems }}>
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
          <ScrollArea
            className="h-[400px] w-[415px]"
          >
            <Reorder.Group
              axis="y"
              values={filteredItems}
              onReorder={setFilteredItems}
            >
              {
                filteredItems.length > 0 ?
                  filteredItems.map((value) => (
                    <Reorder.Item
                      key={value.id}
                      value={value}
                    >
                      <Card
                        key={value.id}
                        className={cn(
                          "w-[400px] mb-4",
                          {
                            'bg-blue-400': value.checklistItems && isPartlyChecklistTrue(value.id),
                            'bg-green-400': isItemCompleted(value),
                            // 'bg-green-400': !value.checklistItems && value.isChecked === true,
                            // 'bg-green-400': value.checklistItems && isAllChecklistTrue(value.id),
                          }
                        )}
                      >
                        <CardHeader>
                          <CardTitle className="flex justify-between">
                            {
                              value.title && !value.checklistItems ?
                                <div className="flex flex-row">
                                  <div className="mr-2">
                                    <Checkbox id={value.title} onCheckedChange={() => handleDefaultChecklist(value.id)} checked={value.isChecked} />
                                  </div>
                                  <div className="flex flex-wrap flex-grow-1">

                                    <p className="text-start text-wrap">{value.title}</p>
                                  </div>
                                </div>


                                :

                                <div className="flex flex-wrap flex-grow-1">
                                  <p className="text-start text-wrap">{value.title}</p>
                                </div>

                            }


                            <div className="flex flex-row">
                              <Button variant="ghost" size="sm" onClick={() => deleteTask(value.id)}>
                                <Trash2Icon className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <PencilIcon className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {
                            value.checklistItems ?
                              value.checklistItems.map((item) => (
                                <div key={item.id} className="flex flex-col mb-2">

                                  <div className="flex flex-row justify-start items-center">
                                    <Checkbox key={item.title} onCheckedChange={() => handleMultiChecklist(value.id, item.id)} checked={item.isChecked} className="mr-2" />
                                    <div className="flex flex-col justify-start items-start">
                                      <Label className="text-lg" htmlFor={item.title}>{item.title}</Label>
                                      {/* <Label htmlFor={item.notes}>{item.notes}</Label> */}
                                    </div>

                                  </div>
                                </div>


                              ))
                              :

                              <div className="flex items-center space-x-2">
                                {/* <Checkbox id={value.description} onCheckedChange={() => handleDefaultChecklist(value.id)} checked={value.isChecked} /> */}
                                <Label htmlFor="terms">{value.description}</Label>
                              </div>
                          }


                        </CardContent>
                      </Card>
                    </Reorder.Item>


                  ))

                  :

                  <Card
                    className="w-[400px]"
                  >
                    <CardHeader>
                      <CardDescription>
                        Add your first Task
                        <TaskDialog />
                      </CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                      <h3 className="italic text-slate-400">Add your Task with the button Below</h3>
                    </CardContent> */}
                  </Card>

              }



            </Reorder.Group>
          </ScrollArea>



          {/* <Reorder.Group
          axis="y"
          values={cobaListItem}
          onReorder={setCobaListItem}
          layoutScroll
          style={{ overflowY: "scroll" }}
        >
          {
            cobaListItem.map((item) => (
              <Reorder.Item
                key={item.id} value={item}
              >
                <Card className="w-[450px] mb-4" key={item.id}>
                  <CardHeader>
                    <div className=" grid grid-cols-[auto,1fr]">
                      <div className="col-span-1 inline-flex mt-2 mr-2">
                        <Checkbox id={item.id.toString()} onCheckedChange={() => handleItemCheckbox(item.id)} defaultChecked={item.isChecked} />
                      </div>
                      <div className="col-span-1 text-justify pt-1">
                        <p>{item.name}</p>
                      </div>
                    </div>
                    <p className="ml-4 text-start bg-yellow-200">outside div</p>
                  </CardHeader>
                  <CardContent>


                  </CardContent>
                </Card>
              </Reorder.Item>

            ))
          }

        </Reorder.Group> */}

          <Button variant="destructive" onClick={handleCheckedChange}>Check Item Value</Button>

          {
            validate ? <p>{JSON.stringify(filteredItems, null, 2)}</p> : null
          }

          {/* <Button className="w-[500px]" variant="outline">Add Task</Button> */}
          <TaskDialog />
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
    </TasksContext.Provider>

  )
}

export default TaskView