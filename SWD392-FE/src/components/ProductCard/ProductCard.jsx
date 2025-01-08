const ProductCard = () => {
  return (
    <div>
      <h1>ProductCard</h1>
      <div className="group relative cursor-pointer">
        <a
        //   href={`/course/${course._id}`}
        //   onClick={(e) => {
        //     e.preventDefault();
        //     navigate(`/course/${course._id}`);
        //   }}
        >
          <Card
            hoverable
            styles={{
              body: {
                height: "100%",
                width: "100%",
              },
            }}
            cover={
              <div className="relative">
                <img
                  alt={course.name}
                  src={course.image_url}
                  className={`${
                    viewMode === "list"
                      ? "min-w-[200px]  w-[200px] md:min-w-[250px] md:w-[250px]"
                      : "w-full"
                  } h-40 sm:h-56 object-cover`}
                />
                <Tag className="absolute top-2 left-2 bg-black text-white">
                  {course.category_name}
                </Tag>
              </div>
            }
            className={`${
              viewMode === "list" && " h-[200px] md:"
            }h-full group-hover:shadow-lg rounded-3xl overflow-hidden group font-jost  group-hover:-translate-y-2  hover:-translate-y-2 transition-all duration-500 ${
              viewMode === "list" ? "flex" : ""
            }`}
          >
            <div className="flex-grow">
              <a
                className="text-gray-500 text-sm mb-2"
                href={`profile/${course.instructor_id}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/profile/${course.instructor_id}`);
                }}
              >
                by {course.instructor_name}
              </a>
              <h2 className="text-base font-semibold  overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">
                {course.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">Level {course.level}</p>
            </div>
            <div>
              <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <AiOutlineClockCircle
                    className="mr-1 text-orange-500"
                    size={18}
                  />
                  {Math.ceil(course.full_time / 60)} Hours
                </span>
                <span className="flex items-center justify-end text-left">
                  <FaStar className="mr-1 text-yellow-400" size={20} />
                  {course.average_rating} ({course.review_count})
                </span>

                <span className="flex items-center">
                  <BiBook className="mr-1 text-orange-500" size={18} />
                  {course.lesson_count} Lessons
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base sm:text-lg font-bold text-orange-500">
                  {!course.is_purchased ? (
                    <p className="flex items-center">
                      {typeof course.price === "number"
                        ? moneyFormatter(course.price, course.discount)
                        : course.price}
                      {course.discount > 0 && (
                        <span className=" ml-2 font-normal text-sm line-through text-gray-400 ">
                          {" "}
                          {moneyFormatter(course.price)}
                        </span>
                      )}
                    </p>
                  ) : (
                    <a
                      href={`/course/${course._id}`}
                      className="px-4 sm:px-2 py-1 bg-orange-500 rounded-full hover:bg-orange-400 text-sm transition-all flex justify-center font-jost font-medium text- text-white hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/course/${course._id}`);
                      }}
                    >
                      Go to course <ArrowRightOutlined className="w-3 ml-2" />
                    </a>
                  )}
                </span>
              </div>
            </div>
          </Card>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
