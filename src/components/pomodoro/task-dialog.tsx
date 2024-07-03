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
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { Label } from "../ui/label";
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from "react";
import { TasksList, checklistItemsType, useTasksContext } from "./task-view";
import { Checkbox } from "../ui/checkbox";
import { v7 as uuidv7 } from "uuid";

interface FormItems {
  title: string,
  notes?: string,
  checklistItems?: ChecklistItems[]
}

interface ChecklistItems {
  id?: number,
  title: string,
  notes?: string,
  isChecked?: boolean,
}

function TaskDialog() {
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm<FormItems>();

  const { register: register2, handleSubmit: handleSubmit2, control: control2, reset: reset2, formState: { errors: errors2 } } = useForm<FormItems>({
    defaultValues: {
      checklistItems: [{ title: "", isChecked: false }]
    }
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { filteredItems, setFilteredItems } = useTasksContext()
  const addChecklistTemplate: checklistItemsType = {
    id: Date.now(),
    title: "",
    isChecked: false
  }
  const [addChecklists, setAddChecklists] = useState([addChecklistTemplate]);
  const { fields: fields2, append: append2, remove: remove2, update: update2 } = useFieldArray({
    control: control2,
    name: "checklistItems"
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmitDefault: SubmitHandler<FormItems> = (data) => {
    // console.log(data)  
    let lastId: number;
    if (filteredItems.length > 0) {
      console.log("filtedLenght: ", filteredItems.length)
      lastId = filteredItems[filteredItems.length - 1].id
      console.log("submitted default: ", lastId)
    } else {
      lastId = 0
    }

    const newData: TasksList = {
      id: lastId + 1,
      title: data.title,
      description: data?.notes,
      taskType: "default"
    }
    setFilteredItems([newData, ...filteredItems])

    reset({
      title: "",
      notes: "",
    })
    setIsDialogOpen(false)

  }

  const onSubmitChecklist: SubmitHandler<FormItems> = (data) => {
    setIsSubmitted(true)
    // console.log(data)

    if (data.checklistItems) {
      let lastId: number;
      if (filteredItems.length > 0) {
        console.log("filtedLenght: ", filteredItems.length)
        lastId = filteredItems[filteredItems.length - 1].id
        console.log("submitted default: ", lastId)
      } else {
        lastId = 0
      }

      let arrChecklistItems: checklistItemsType[] = []
      // let last_checklistId: number;
      data.checklistItems.map((item, index) => {
        const checklistObj: checklistItemsType = {
          id: index + 1,
          title: item.title,
          isChecked: item.isChecked ? item.isChecked : false
        }
        arrChecklistItems.push(checklistObj)
      })
      console.log(arrChecklistItems)
      const newData: TasksList = {
        id: lastId + 1,
        title: data.title,
        taskType: "checklist",
        checklistItems: arrChecklistItems
      }
      console.log("ready to save: ", newData)
      setFilteredItems([...filteredItems, newData])
      // reset2({
      //   title: "",
      //   checklistItems: [{ title: "", isChecked: false }]
      // })
      setIsDialogOpen(false)
      // console.log(addChecklists);
    }


  }

  function handleCheckboxChanges(item: ChecklistItems, idx: number) {
    update2(idx, { ...item, isChecked: !item.isChecked })
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
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="" variant="outline">Add Task</Button>
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
                      {errors.notes && <p>{errors.notes.message}</p>}
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </div>

              </TabsContent>
              <TabsContent value="checklists">
                <div className="">
                  <form
                    onSubmit={handleSubmit2(onSubmitChecklist)}
                  >
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="title">Title</Label>

                      <Input
                        id="title"
                        placeholder="title"
                        {...register2('title', { required: 'Title is required' })}
                      />
                      {errors2.title && <p>{errors2.title.message}</p>}


                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="checklist_item">Checklist Item</Label>
                      <div className="flex flex-col gap-2">
                        {
                          fields2.map((item, index) => (
                            <div key={index} className="flex flex-row">
                              <Checkbox
                                key={item.title}
                                id="isChecked"
                                onCheckedChange={() => handleCheckboxChanges(item, index)}
                                checked={item.isChecked}
                                className="mr-2"
                                {...register2(`checklistItems.${index}.isChecked`)}
                              />
                              <Input
                                id="title"
                                placeholder="insert sub item..."
                                {...register2(`checklistItems.${index}.title`, { required: "Title is required" })}
                              />
                              {
                                fields2.length - 1 !== 0 ?
                                  <Button
                                    size="icon"
                                    type="button"
                                    onClick={() => remove2(index)}
                                  >
                                    -
                                  </Button>
                                  : null
                              }

                              {
                                index === (fields2.length - 1) ?
                                  <Button
                                    size="icon"
                                    type="button"
                                    onClick={() => append2({ title: "", isChecked: false })}
                                  >
                                    +
                                  </Button>
                                  : null
                              }




                            </div>
                          ))
                        }

                        {/* <Button
                            size="icon"
                            type="button"
                            onClick={() => append2({ title: "" })}
                          >
                            +
                          </Button> */}




                      </div>
                    </div>


                    <Button type="submit">adddd</Button>


                  </form>
                </div>

              </TabsContent>
            </Tabs>
          </div>

          <div>
            {
              isSubmitted ?
                <p>{JSON.stringify(register2, null, 2)}</p>
                : null
            }
          </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TaskDialog

