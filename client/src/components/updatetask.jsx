import React, { useState } from "react";
import { TbSquareRoundedLetterXFilled } from "react-icons/tb";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { dataRefresher } from "../redux/actions";
import { useDispatch } from "react-redux";

const UpdateFormModal = ({ setTaskFormopen, currenttask }) => {
  let [titleInput, steTitleInput] = useState(currenttask.title);
  let [descriptionInput, steDescriptionInput] = useState(
    currenttask.description
  );
  let [priorityInput, setPriorityInput] = useState(currenttask.priority);
  let [dueDateInput, setDueDateInput] = useState(currenttask.deadline);
  let [statusInput, setStatusInput] = useState(currenttask.status);
  let dispatch = useDispatch();
  let id = currenttask._id;

  function handleUpdateTask(e) {
    e.preventDefault();
    let email = JSON.parse(localStorage.getItem("email"));
    let token = JSON.parse(localStorage.getItem("token"));
    let newTask = {
      title: titleInput,
      description: descriptionInput,
      priority: priorityInput,
      deadline: dueDateInput,
      status: statusInput,
      email: email,
    };
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.priority ||
      !newTask.deadline
    ) {
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
      return;
    }
    axios
      .put(`https://task-management-r4tm.onrender.com/api/task/${id}/${token}`, newTask)
      .then((response) => {
        toast.success("Task updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        setTaskFormopen(false);
        axios
          .get(`https://task-management-r4tm.onrender.com/api/task/${token}`)
          .then((response) => {
            dispatch(dataRefresher(response.data));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        toast.error("Failed to update task. Please try again later!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      });
  }

  return (
    <div className="w-full fixed top-0 left-0 h-screen backdrop-blur-xl font-sans flex justify-center items-center z-50">
      <div className="relative w-[350px] h-[600px] bg-white bg-opacity-20 shadow-[1px_1px_15px_1px_rgba(0,0,0,0.15)] backdrop-blur-md border-[1px] border-white border-opacity-5 rounded-[10px_50px] px-6 py-4">
        <div className="flex justify-evenly items-center">
          <h3 className="text-2xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045] text-center">
            Update Form
          </h3>
          <TbSquareRoundedLetterXFilled
            onClick={() => setTaskFormopen(false)}
            className="text-3xl text-white cursor-pointer"
          />
        </div>

        <form>
          <label
            htmlFor="taskName"
            className="block pt-2 pb-2 text-white text-lg"
          >
            Task Title
          </label>
          <input
            value={titleInput}
            onChange={(e) => steTitleInput(e.target.value)}
            type="text"
            id="taskName"
            placeholder="Enter Task Title"
            className="w-full outline-none h-10 px-2 bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
          />
          <label
            htmlFor="taskDescription"
            className="block pt-2 pb-2 text-white text-lg"
          >
            Description
          </label>
          <textarea
            value={descriptionInput}
            onChange={(e) => steDescriptionInput(e.target.value)}
            id="taskDescription"
            placeholder="Enter Task Description"
            className="w-full outline-none h-18 px-2 bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
          ></textarea>

          <label
            htmlFor="taskDescription"
            className="block pt-2 pb-2 text-white text-lg"
          >
            Priority
          </label>
          <select
            value={priorityInput}
            onChange={(e) => setPriorityInput(e.target.value)}
            id="taskDescription"
            placeholder="Enter Task Description"
            className="w-full outline-none h-10 px-2 bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
          >
            <option className="text-black " value="High">
              High
            </option>
            <option className="text-black " value="Medium">
              Medium
            </option>
            <option className="text-black " value="Low">
              Low
            </option>
          </select>

          <label
            htmlFor="taskDescription"
            className="block pt-2 pb-2 text-white text-lg"
          >
            Status
          </label>
          <select
            value={statusInput}
            onChange={(e) => setStatusInput(e.target.value)}
            id="taskDescription"
            placeholder="Enter Task Description"
            className="w-full outline-none h-10 px-2 bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
          >
            <option className="text-black " value="Pending">
              Pending
            </option>
            <option className="text-black " value="InProgress">
              In Progress
            </option>
            <option className="text-black " value="Completed">
              Completed
            </option>
          </select>
          <label
            htmlFor="taskDeadline"
            className="block pt-4 pb-2 text-white text-lg"
          >
            Deadline
          </label>
          <input
            value={dueDateInput?.split("T")[0]}
            onChange={(e) => setDueDateInput(e.target.value)}
            type="date"
            id="taskDeadline"
            className="w-full outline-none h-10 px-2 bg-[#ffffff0b] text-white placeholder:text-white placeholder:opacity-75 text-lg rounded-md hover:bg-[#ffffff10] transition-all duration-450"
          />
          <button
            onClick={handleUpdateTask}
            className="w-full h-10 mt-6 bg-white text-black text-lg font-bold rounded-full hover:bg-[#ffffffc2] transition-all duration-450"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFormModal;
