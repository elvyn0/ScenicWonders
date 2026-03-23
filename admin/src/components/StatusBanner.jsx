import { Users, Hotel, NotepadText, DollarSign } from "lucide-react";
import StatCart from "./StatCart";
import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

function StatusBanner() {
  const [status, setStatus] = useState(null);

  const fetchStatus = async () => {
    try {
      const response = await api.get("/api/bookings/admin/bookingStatus");

      if (response.data.success) {
        setStatus({
          totalUsers: response.data.totalUsers,
          totalHotels: response.data.totalHotels,
          totalBookings: response.data.totalBookings,
          totalRevenue: response.data.totalRevenue,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchStatus();
    };
    loadData();
  }, []);

  const RevenueClass = "bg-gradient-to-br from-green-500 to-emerald-600 text-white scale-105";
  return (
    <div className="mx-10 bg-white shadow-lg  rounded-b-lg ">
      <div className="flex  flex-col  ">
        <div className="bg-black p-5 rounded-t-lg">
          <h1 className="font-bold text-2xl text-white">Dashboard</h1>
        </div>

        {status && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-6 mt-6">
            <StatCart title="Total Users" value={status.totalUsers} Icon={Users} />
            <StatCart title="Total Hotels" value={status.totalHotels} Icon={Hotel} />
            <StatCart title="Total Bookings" value={status.totalBookings} Icon={NotepadText} />
            <div className="border-green-600 border-3 rounded-md">
              <StatCart title="Revenue" value={status.totalRevenue} Icon={DollarSign} className={RevenueClass} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusBanner;
