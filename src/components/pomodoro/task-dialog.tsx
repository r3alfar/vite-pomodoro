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
import { FormEvent } from "react";

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

  const onSubmit: SubmitHandler<FormItems> = (data) => {
    console.log(data)
  }

  return (
    <div className="mb-4">
      <Dialog>
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
            <Tabs defaultValue="account" className="">
              <TabsList className="flex justify-evenly">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                {/* form account */}
                <div className="">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
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
                        {...register('notes')}
                      />
                    </div>
                    <Button type="submit">Submit</Button>
                  </form>
                </div>

              </TabsContent>
              <TabsContent value="password">
                <div className="">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
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
                      <div className="flex flex-row gap-2">
                        <Input id="checklist_item" placeholder="checklist item" />
                        <Button type="submit" size="sm">
                          add
                        </Button>
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

