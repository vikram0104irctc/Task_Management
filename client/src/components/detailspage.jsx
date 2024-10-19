import { motion } from "framer-motion";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  let parentRefc = useRef(null);
  let item = useSelector((state) => state.item);
  let navigate = useNavigate();
  return (
    <div
      ref={parentRefc}
      className="max-w-[1360px] m-auto mt-24 min-h-[60vh] flex items-center justify-center p-5"
    >
      <motion.div
        drag
        dragConstraints={parentRefc}
        key={item._id}
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
        className="max-w-[800px] text-white pt-5 rounded-2xl bg-[#080710] border border-zinc-700 overflow-hidden relative"
      >
        <h4 className="mb-3 pl-5 pr-5 text-lg text-center text-transparent  bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045] font-bold">
          {item.title}
        </h4>
        <p className="text-sm mb-1 pl-5 pr-5">{item.description}</p>
        <div className="flex justify-between mb-1 pl-5 pr-5">
          <p className="text-sm">Duedate :</p>
          <p className="text-sm">
            {item.deadline?.split("T")[0].split("-").reverse().join("-")}
          </p>
        </div>
        <div className="flex justify-between mb-1 pl-5 pr-5">
          <p className="text-sm">Priority :</p>
          <p className="text-sm">{item.priority}</p>
        </div>
        <div className="flex justify-between mb-16 pl-5 pr-5">
          <p className="text-sm">Status :</p>
          <p className="text-sm">{item.status}</p>
        </div>
        <div className="h-10 w-full bg-gradient-to-r from-[#FF0000] via-[#BC00FF] to-[#FCB045] flex items-center pl-5 pr-5 justify-center absolute bottom-0">
          <div>
            <p
              onClick={() => navigate("/")}
              className="border text-xs py-1 px-3  rounded-lg cursor-pointer"
            >
              Back
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailsPage;
