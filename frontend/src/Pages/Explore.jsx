import PlacesCategory from "../components/PlacesCategory";
import StoriesCategories from "../components/StoryFolder/StoriesCategories";
import PostCategories from "../components/PostFolder/PostCategories";

const Explore = () => {
  return (
    // Main Container
    <div className="flex flex-col gap-10 mx-3  mt-10 mb-8">
      <div>
        <PlacesCategory />
      </div>
      <div>
        <StoriesCategories />
      </div>
      <div>
        <PostCategories />
      </div>
    </div>
  );
};

export default Explore;
