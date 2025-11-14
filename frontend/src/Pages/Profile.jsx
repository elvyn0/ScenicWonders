import { assets } from "../assets/assets";

function Profile() {
  return (
    <div className="p-5">
      <div className="flex flex-col justify-center gap-3 items-center">
        <div>
          <img className="w-[100px] rounded-full" src={assets.profile1} />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <h2>@narutto</h2>
          <p className="text-sm text-gray-600">Narutto</p>
        </div>
      </div>
      <div className="flex flex-row gap-5 justify-center items-center mt-5">
        <div>
          <h3 className="font-bold" type="button">
            Post
          </h3>
        </div>
        <div>
          <h3 className="font-bold" type="button">
            Stories
          </h3>
        </div>
        <div>
          <h3 className="font-bold" type="button">
            Fav
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
