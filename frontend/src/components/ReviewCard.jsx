import ReactStar from 'react-rating-stars-component';

const ReviewCard = ({ reviews }) => {
  // Component structure: Container for individual reviews
  return (
    <div className="my-6 max-w-md max-h-96 border-2 md:w-80 mx-4 md:my-3 rounded-md overflow-hidden border-black">
      {/* Review header: User avatar, name, and rating */}
      <div className="bg-gray-400 justify-between flex items-center py-2 px-4">
        {/* User details: Avatar and name */}
        <div className="flex items-center">
          <img className="w-10 items rounded-full" src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" alt="ProfilePhoto" />
          <div className="mx-3">Name ghhh</div>
        </div>
        {/* Rating component to display the user's rating */}
        <div className="rating">
          <ReactStar value={Number(reviews.rating)} color={"rgb(0,0,0)"} size={20} activeColor={"rgb(255,153,0)"} edit={false} isHalf={true} />
        </div>
      </div>

      {/* Review comment: Displayed if available */}
      {reviews?.comment && (
        <div className="py-2 text-sm px-4">{reviews?.comment}</div>
      )}
    </div>
  );
};

export default ReviewCard;