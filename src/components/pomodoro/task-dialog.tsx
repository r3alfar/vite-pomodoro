import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button"
import { useForm, SubmitHandler } from 'react-hook-form'
import { Label } from "../ui/label";
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from "react";
import { TasksList, checklistItemsType, useTasksContext } from "./task-view";
import { Checkbox } from "../ui/checkbox";

interface FormItems {
  title: string,
  notes?: string,
  checklistItems?: ChecklistItems[]
}

interface ChecklistItems {
  id: string,
  title: string,
  notes?: string,
  isChecked: boolean,
}

function TaskDialog() {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormItems>();
  const arrChecklist = [];
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { filteredItems, setFilteredItems } = useTasksContext()
  const addChecklistTemplate: checklistItemsType = {
    id: Date.now(),
    title: "",
    isChecked: false
  }
  const [addChecklists, setAddChecklists] = useState([addChecklistTemplate]);

  const onSubmitDefault: SubmitHandler<FormItems> = (data) => {
    // console.log(data)  
    const lastId = filteredItems[filteredItems.length - 1].id
    const newData: TasksList = {
      id: lastId + 1,
      title: data.title,
      description: data?.notes,
      taskType: "default"
    }
    setFilteredItems([newData, ...filteredItems])
    console.log("submitted default: ", lastId)
    setIsDialogOpen(false)

  }

  const onSubmitChecklist: SubmitHandler<FormItems> = (data) => {
    console.log(data)
  }

  const addList = () => {
    console.log("clieck")
    // console.log(JSON.stringify(filteredItems, null, 2))

    // setFilteredItems(filteredItems => filteredItems.map((item) =>
    //   item.id === 4 ? { ...item, title: "Updated from child", isChecked: true } : item
    // ))

    let newData: TasksList = {
      id: 123,
      title: "created from child",
      description: "something",
      taskType: "default",
      isChecked: false
    }

    setFilteredItems([...filteredItems, newData])

    // setCobaListItem(cobaListItem => cobaListItem.map((item) =>
    //   item.id === id ? { ...item, isChecked: !item.isChecked } : item
    // ))
  }

  function handleAddChecklist() {
    setAddChecklists([...addChecklists, addChecklistTemplate])
  }

  return (
    <div className="mb-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-[400px]" variant="outline">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          {/* content */}
          <div className="">
            <Tabs defaultValue="notes" className="">
              <TabsList className="flex justify-evenly">
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="checklists">Checklists</TabsTrigger>
              </TabsList>
              <TabsContent value="notes">
                {/* form account */}
                <div className="">
                  <form
                    onSubmit={handleSubmit(onSubmitDefault)}
                  >
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        type="text"
                        id="title"
                        placeholder="title"
                        {...register('title', { required: 'Title is required' })}
                      />
                      {errors.title && <p>{errors.title.message}</p>}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="notes">Notes</Label>
                      <Input
                        type="text"
                        id="notes"
                        placeholder="notes"
                        {...register('notes', { required: 'Notes is required' })}
                      />
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </div>

              </TabsContent>
              <TabsContent value="checklists">
                <div className="">
                  <form
                    onSubmit={handleSubmit(onSubmitChecklist)}
                  >
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="title">Title</Label>

                      <Input
                        id="title"
                        placeholder="title"
                        {...register('title', { required: 'Title is required' })}
                      />


                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="checklist_item">Checklist Item</Label>
                      {/* <div className="flex flex-row gap-2">
                        <Input id="checklist_item" placeholder="checklist item" />
                        <Button type="button" onClick={addList} size="sm">
                          add
                        </Button>
                      </div> */}
                      <div className="flex flex-col gap-2">
                        {
                          addChecklists.map((item) => (
                            <div className="flex flex-row">
                              <Checkbox defaultChecked={item.isChecked} />
                              <Input key={item.id} />
                              <Button type="button" onClick={handleAddChecklist} size="sm">
                                +
                              </Button>
                            </div>
                          ))
                        }

                        {/* <Input id="checklist_item" placeholder="checklist item" />
                        <Button type="button" onClick={addList} size="sm">
                          add
                        </Button> */}
                      </div>
                    </div>

                  </form>
                </div>

              </TabsContent>
            </Tabs>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskDialog

