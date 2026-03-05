import BookingBar from "../components/hotels/BookingSearchBar/BookingBar";
import Hotels from "../components/hotels/Hotels";

function HotelsAndBookingbar() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <BookingBar />
      </div>
      <div>
        <Hotels />
      </div>
    </div>
  );
}

export default HotelsAndBookingbar;
