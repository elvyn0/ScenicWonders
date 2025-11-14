import PlacesCategory from "../Components/PlacesCategory";
import StoriesCategories from "../Components/storiesCategories";
import PostCategories from "../Components/PostCategories";
import SearchBar_main from "../Components/SearchBar_main";

const Explore = () => {
  return (
    // Main Container
    <div className="  mx-[8%] mt-28 mb-[4%]">
      {/* Sticky Search Bar */}
      <SearchBar_main />
      <div className="mb-48">
        <PlacesCategory />
      </div>
      <div className="mb-48">
        <StoriesCategories />
      </div>
      <div>
        <PostCategories />
      </div>
    </div>
  );
};

export default Explore;
