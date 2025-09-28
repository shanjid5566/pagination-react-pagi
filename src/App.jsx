import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, SetItemsPerPage] = useState(10);
  const [allPages,setAllPages] = useState([]);

  const totalPages = Math.ceil(allPages.length / itemsPerPage);
  console.log(totalPages)
  const pages = [...Array(totalPages).keys()];

    useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setAllPages(data));
  }, [currentPage,itemsPerPage]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage+1}&_limit=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [currentPage,itemsPerPage]);
  const handleItemsPerPage = (e) => {
    console.log(e.target.value);
    const val = parseInt(e.target.value);
    SetItemsPerPage(val);
    setCurrentPage(0);
  };

  const handleBackPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      console.log(currentPage);
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <div className="max-7xl mx-0 p-4">
        <div className="justify-between flex-col items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((user) => {
            return (
              <div className="text-center p-8 border">
                <p>{user.id}</p>
                <p>{user.title}</p>
              </div>
            );
          })}
        </div>
        <div className="btnContainer">
          <button onClick={handleBackPage}>Back</button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={currentPage == page && "selected"}
            >
              {page+1}
            </button>
          ))}
          <button onClick={handleNextPage}>next</button>
          <select
            name=""
            id=""
            value={itemsPerPage}
            onChange={handleItemsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
