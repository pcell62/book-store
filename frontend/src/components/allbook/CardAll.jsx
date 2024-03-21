import BookSingleCardAll from "./SingleCardAll";

const CardAll = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
        <BookSingleCardAll key={item._id} book={item} />
      ))}
    </div>
  );
};

export default CardAll;
