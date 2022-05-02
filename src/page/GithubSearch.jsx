import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { Modal, Button, Alert} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const GithubSearch = () => {
  const location = useLocation()
  const [users, setusers] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const fetchUser = async (currrentPage) => {
    if(currrentPage <= 100){
      try {
        const res = await axios.get(
          `https://api.github.com/search/users?q=${search}&page=${currrentPage}&per_page=10`
        );
        const data = res.data.items;
        return data;
        
      } catch (error) {
        console.log(error)
      }
    }else{
      setShow(true)
      return null
    }
     
  };

  const handlePage = async (data) => {
    let currentPage = data.selected + 1;
    const latestFromCall = await fetchUser(currentPage);
    
    if( latestFromCall != null){
      setusers(latestFromCall);
    }

  };



  const searchData = (e)=>{
    e.preventDefault()
    if (search) {
      getUsers(search)
    }else{
      alert("type what to search")
    }
  }

  const getUsers = async (query) => {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${query}&page=1&per_page=10`
    );

    const data = res.data.items;
    const totalCount = res.data.total_count;
    setTotal(totalCount);
    setPageCount(Math.ceil(totalCount / 10));
    setusers(data);
  };



  useEffect(() => {
    if (location?.state?.data) {
      getUsers(location?.state?.data)
    } 
  }, [location?.state])
  






  return (
    <>
      <div
        className="content bg-light container-fluid"
        style={{ minHeight: "100%", margin: 0 }}
      >
        <div className="container">
          <div className="text-lg text-secondary my-2">GitSearch</div>
          <div className="d-flex my-2">
            <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
              type="text"
              className="form-control"
              placeholder="search for user"
            />
            <button onClick={searchData} className="btn btn-sm btn-primary">Search</button>
          </div>
          {
            users.length > 0 && (
              <div className="my-3">Search result: {total}</div>
            )
          }
          <div className="row">
            { users && users?.length > 0 &&
              users.map((user) => (
                <div key={user?.id} className="col-md-4 col-12">
                  <div className="text-center card-box">
                    <div className="member-card pt-2 pb-2">
                      <div className="thumb-lg member-thumb mx-auto">
                        <img
                          src={user?.avatar_url}
                          className="rounded-circle img-thumbnail"
                          alt="profile"
                        />
                      </div>
                      <div className="">
                        <h6>{user?.login}</h6>
                      </div>
                      <Link to={`/details/${user?.login}`}>
                        <button
                          type="button"
                          className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                        >
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {
          users && users?.length > 0 && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePage}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />

          )
        }
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title>Alert!!</Modal.Title>
        </Modal.Header>
        <Modal.Body >Only the first 1000 search results are available</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
     
    </>
  );
};

export default GithubSearch;
