import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  LinearProgress,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priority, setPriority] = useState("Medium"); // State for priority
  const [filterPriority, setFilterPriority] = useState("All"); // State for filter priority
  const [anchorEl, setAnchorEl] = useState(null); // State for filter menu anchor

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
      setTasks([...tasks, { name: taskInput, checked: false, priority }]);
      setTaskInput("");
      setPriority("Medium"); // Reset priority to default
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

  // Filter tasks based on search query and selected priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // Handle filter menu open
  const handleFilterMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle filter menu close
  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle filter priority change
  const handleFilterPriorityChange = (priority) => {
    setFilterPriority(priority);
    handleFilterMenuClose();
  };

  // Check if a filter is active
  const isFilterActive = searchQuery || filterPriority !== "All";

  return (
    <div className=" sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl flex font-bold text-center mb-4">Task List</h1>

      {/* Random Quote */}
      <div className="text-sm sm:text-base text-gray-600 flex italic text-center mb-4">
        "{currentQuote}"
      </div>

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
        <div className="text-sm text-gray-600 flex mt-1 text-center">
          {progress}% completed ({completedTasks}/{totalTasks} tasks)
        </div>
      </div>

      {/* Add Task Button and Filter Icon Button */}
      <div className="w-full mb-4 mt-8 flex justify-between">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '10px 20px',
            fontSize: '12px',
            '&:hover': {
              backgroundColor: '#374151',
            },
          }}
        >
          + Add New Task
        </Button>
        {/* Filter Icon Button */}
        <IconButton
          aria-label="filter"
          onClick={handleFilterMenuOpen}
          sx={{
            backgroundColor: '#1f2937',
            color: 'white',
            '&:hover': {
              backgroundColor: '#374151',
            },
          }}
        >
          <FilterListIcon />
        </IconButton>
        {/* Filter Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterMenuClose}
        >
          <MenuItem onClick={() => handleFilterPriorityChange("All")}>All</MenuItem>
          <MenuItem onClick={() => handleFilterPriorityChange("High")}>High</MenuItem>
          <MenuItem onClick={() => handleFilterPriorityChange("Medium")}>Medium</MenuItem>
          <MenuItem onClick={() => handleFilterPriorityChange("Low")}>Low</MenuItem>
        </Menu>
      </div>

      {/* Filter Indicator */}
      {isFilterActive && (
        <div className="text-sm text-gray-600 item-center mb-4">
          <strong>Filter Applied:</strong>
          {searchQuery && (
            <Chip
              label={`Search: "${searchQuery}"`}
              onDelete={() => setSearchQuery("")}
              sx={{ margin: '4px' }}
            />
          )}
          {filterPriority !== "All" && (
            <Chip
              label={`Priority: ${filterPriority}`}
              onDelete={() => setFilterPriority("All")}
              sx={{ margin: '4px' }}
            />
          )}
        </div>
      )}

      {/* Pop-up Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <div
          className="px-2 py-4"
          style={{
            width: '100%',
            maxWidth: '370px',
            margin: '0 auto',
          }}
        >
          <DialogTitle>
            <span className="text-base font-semibold">Add a New Task</span>
          </DialogTitle>
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
              sx={{ mb: 2 }} // Add margin bottom
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
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
                padding: '10px 20px',
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
      <ul className="mt-4 w-full flex flex-col">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <li
              className="w-full px-6 py-4 flex justify-between bg-white border border-gray-200 shadow rounded-lg mb-4"
              key={index}
              style={{
                backgroundColor: task.checked ? '#f3f4f6' : '#ffffff',
              }}
            >
              <div className="flex w-full">
                <Checkbox
                  checked={task.checked}
                  onChange={() => toggleCheckbox(index)}
                  color="primary"
                />
                <div className="flex flex-col justify-start gap-1 items-start w-full">
                  <p
                    style={{
                      textDecoration: task.checked ? 'line-through' : 'none',
                      color: task.checked ? '#888' : '#000',
                    }}
                  >
                    {task.name}
                  </p>
                  {task.priority === "High" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {task.priority}
                    </span>
                  )}
                  {task.priority === "Medium" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {task.priority}
                    </span>
                  )}
                  {task.priority === "Low" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {task.priority}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <IconButton
                  onClick={() => deleteTask(index)}
                  color="error"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))
        ) : (
          <div className="text-gray-600 text-center">
            {isFilterActive
              ? "No tasks match the current filter."
              : "No tasks available. Add a new task!"}
          </div>
        )}
      </ul>
    </div>
  );
}

export default App;