import { Users, Hotel, NotepadText, DollarSign } from "lucide-react";
import StatCart from "./StatCart";

function StatusBanner() {
  const RevenueClass = "bg-gradient-to-br from-green-500 to-emerald-600 text-white scale-105";
  return (
    <div className="mx-10 bg-white shadow-lg  rounded-b-lg ">
      <div className="flex  flex-col  ">
        <div className="bg-black p-5 rounded-t-lg">
          <h1 className="font-bold text-2xl text-white">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-6 mt-6">
          <StatCart title="Total Users" value="1,025,358" Icon={Users} />
          <StatCart title="Total Hotels" value="1,025,358" Icon={Hotel} />
          <StatCart title="Total Bookings" value="1,025,358" Icon={NotepadText} />
          <div className="border-green-600 border-3 rounded-md">
            <StatCart title="Revenue" value="$10,055,358,785" Icon={DollarSign} className={RevenueClass} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusBanner;
