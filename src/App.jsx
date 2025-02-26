import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton'; // Import IconButton
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const quotes = [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { name: taskInput, checked: false }]);
      setTaskInput("");
      handleClose();
      setCurrentQuote(getRandomQuote());
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setCurrentQuote(getRandomQuote());
  };

  const toggleCheckbox = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
    setCurrentQuote(getRandomQuote());
  };

  const completedTasks = tasks.filter((task) => task.checked).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl flex font-bold  mb-4">Task List</h1>

      {/* Random Quote */}
      <div className="text-sm sm:text-base text-gray-600 flex italic text-center mb-4">
        "{currentQuote}"
      </div>

      {/* Search Bar */}
      {/* <div className="w-full flex  mb-4">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                height: '48px',
              },
            }}
          />
        </div>
      </div> */}

      {/* Progress Bar */}
      <div className="w-full mt-4">
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: '10px',
            borderRadius: '5px',
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1f2937',
            },
          }}
        />
        <div className="text-sm text-gray-600 mt-1 flex text-center">
          {progress}% completed ({completedTasks}/{totalTasks} tasks)
        </div>
      </div>

      {/* Add Task Button */}
      <div className="w-full mb-4 mt-8">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          fullWidth
          sx={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '10px 0',
            fontSize: '12px',
            '&:hover': {
              backgroundColor: '#374151',
            },
          }}
        >
          + Add New Task
        </Button>
      </div>

      {/* Pop-up Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <div className="px-2 py-4 min-w-120">
          <DialogTitle>Add a New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="What needs to be done?"
              type="text"
              fullWidth
              variant="outlined"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter the task"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={addTask}
              variant="contained"
              sx={{
                backgroundColor: '#1f2937',
                color: 'white',
                padding: '10px 0',
                fontSize: '12px',
                '&:hover': {
                  backgroundColor: '#374151',
                },
              }}
            >
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* Display the list of tasks */}
      <ul className="mt-4 w-full flex flex-col items-center">
        {filteredTasks.map((task, index) => (
          <li
            className="w-full px-6 py-4 flex justify-between bg-white border border-gray-200 shadow rounded-lg mb-4"
            key={index}
            style={{
              backgroundColor: task.checked ? '#f3f4f6' : '#ffffff',
            }}
          >
            <div className="flex items-center">
              <Checkbox
                checked={task.checked}
                onChange={() => toggleCheckbox(index)}
                color="primary"
              />
              <span
                style={{
                  textDecoration: task.checked ? 'line-through' : 'none',
                  color: task.checked ? '#888' : '#000',
                  marginLeft: '8px',
                }}
              >
                {task.name}
              </span>
            </div>
            <div>
              {/* Replace Delete Button with Delete Icon */}
              <IconButton
                onClick={() => deleteTask(index)}
                color="error"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;