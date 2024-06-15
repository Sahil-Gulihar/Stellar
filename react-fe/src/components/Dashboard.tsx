import { useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { Badge } from "./ui/badge";
import { Package2Icon, BellIcon, HomeIcon, CalendarIcon, UsersIcon, SettingsIcon } from "lucide-react";

interface Task {
  task: string;
  payment: string;
  deadline: string;
  status: "Completed" | "In Progress" | "Pending";
}

const Dasboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { task: "Website Redesign", payment: "$2,500", deadline: "2023-06-30", status: "Completed" },
    { task: "Mobile App Development", payment: "$5,000", deadline: "2023-08-15", status: "In Progress" },
    { task: "SEO Optimization", payment: "$1,200", deadline: "2023-07-01", status: "Completed" },
    { task: "Branding Guidelines", payment: "$3,000", deadline: "2023-09-30", status: "Pending" },
  ]);

  const [newTask, setNewTask] = useState<Omit<Task, "status">>({ task: "", payment: "", deadline: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewTask({ ...newTask, [id]: value });
  };

  const handleSubmit = () => {
    setTasks([{ ...newTask, status: "Pending" }, ...tasks]);
    setNewTask({ task: "", payment: "", deadline: "" });
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </a>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <a href="#" className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50">
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <CalendarIcon className="h-4 w-4" />
                Tasks
              </a>
              <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <UsersIcon className="h-4 w-4" />
                Freelancers
              </a>
              <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <SettingsIcon className="h-4 w-4" />
                Settings
              </a>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Recent Freelancers</CardTitle>
              </CardHeader>
              <CardContent>
                
                <div className="flex -space-x-0">
                  <Avatar className="h-8 w-8 border-2  border-white dark:border-gray-950">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 mr-2 border-white dark:border-gray-950">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 mr-2 border-white dark:border-gray-950">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 mr-2 border-white dark:border-gray-950">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>LW</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <a href="#" className="lg:hidden">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </a>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              >
                <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Tasks</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create New Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>Fill out the details for your new task.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label htmlFor="task">Task</Label>
                      <Input id="task" placeholder="Enter task details" value={newTask.task} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="payment">Payment</Label>
                      <Input id="payment" type="number" placeholder="Enter payment amount" value={newTask.payment} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input id="deadline" type="date" value={newTask.deadline} onChange={handleInputChange} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="border shadow-sm rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.payment}</TableCell>
                      <TableCell>{task.deadline}</TableCell>
                      <TableCell>
                        <Badge
                          variant={ "info"
                         
                          }
                        >
                          {task.status}
                        </Badge>


                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dasboard;
