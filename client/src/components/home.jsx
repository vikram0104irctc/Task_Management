import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { dataRefresher, detailItem } from "../redux/actions";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateFormModal from "./updatetask";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  let data = useSelector((state) => state.data);
  let dispatch = useDispatch();
  let [currenttask, SetcurrentTask] = useState({});
  const [taskFormopen, setTaskFormopen] = useState(false);
  const parentRef = useRef(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8081/api/task/${token}`)
        .then((response) => {
          dispatch(dataRefresher(response.data));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8081/api/task/${id}/${token}`)
      .then((response) => {
        toast.success("Task deleted successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        axios
          .get(`http://localhost:8081/api/task/${token}`)
          .then((response) => {
            dispatch(dataRefresher(response.data));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        toast.error("Failed to delete task", {
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

  function handleDetails(item) {
    localStorage.setItem("task_details", JSON.stringify(item));
    dispatch(detailItem(item));
    navigate("/detailspage");
  }

  return (
    <>
      {taskFormopen ? (
        <UpdateFormModal
          setTaskFormopen={setTaskFormopen}
          currenttask={currenttask}
        />
      ) : (
        ""
      )}
      <div
        ref={parentRef}
        className="max-w-[1360px] m-auto mt-20 py-4 px-3 flex flex-wrap justify-center gap-5 min-h-[75vh] mb-9"
      >
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <motion.div
                drag
                dragConstraints={parentRef}
                key={item._id}
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                }}
                className="w-[230px] text-white pt-5 rounded-2xl bg-[#080710] border border-zinc-700 overflow-hidden h-[237px] relative"
              >
                <h4 className="mb-3 pl-5 pr-5 text-lg text-center text-transparent  bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045] font-bold h-8 overflow-hidden whitespace-nowrap text-ellipsis">
                  {item.title}
                </h4>
                <p className="text-sm mb-1 pl-5 pr-5 max-h-10 overflow-hidden line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between mb-1 pl-5 pr-5">
                  <p className="text-sm">Duedate :</p>
                  <p className="text-sm">
                    {item.deadline.split("T")[0].split("-").reverse().join("-")}
                  </p>
                </div>
                <div className="flex justify-between mb-1 pl-5 pr-5">
                  <p className="text-sm">Priority :</p>
                  <p className="text-sm">{item.priority}</p>
                </div>
                <div className="flex justify-between mb-5 pl-5 pr-5">
                  <p className="text-sm">Status :</p>
                  <p className="text-sm">{item.status}</p>
                </div>
                <div className="h-10 w-full bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045] flex items-center pl-5 pr-5 justify-between absolute bottom-0">
                  <div>
                    <p
                      onClick={() => handleDetails(item)}
                      className="border text-xs py-1 px-3  rounded-lg cursor-pointer"
                    >
                      Details
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <MdEditSquare
                      onClick={() => {
                        SetcurrentTask(item);
                        setTaskFormopen(!taskFormopen);
                      }}
                      className="text-xl cursor-pointer"
                    />
                    <MdDelete
                      onClick={() => handleDelete(item._id)}
                      className="text-xl cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="max-w-[1360px] m-auto mt-16 py-4 px-3 flex justify-center items-center min-h-[40vh]">
            <h2 className=" font-bold text-8xl text-center text-transparent  bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045]">
              Add your first task
            </h2>
          </div>
        )}
      </div>
    </>
  );
};
