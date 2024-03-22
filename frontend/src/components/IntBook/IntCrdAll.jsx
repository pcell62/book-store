import IntSingleCard from "./IntSingleCard";

const IntCrdAll = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
        <IntSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default IntCrdAll;
