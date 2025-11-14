import { RiCameraAiLine } from "react-icons/ri";
import { FaRegPenToSquare } from "react-icons/fa6";

function TagOrPost() {
  return (
    <div className="w-[500px] absolute top-[30%] left-[50%] ">
      <h1>Create</h1>
      <div>
        <div className="flex justify-between items-center">
          <RiCameraAiLine />
          <h3>Post</h3>
        </div>
        <div className="flex justify-between items-center">
          <FaRegPenToSquare />
          <h3>Stories</h3>
        </div>
      </div>
    </div>
  );
}

export default TagOrPost;
