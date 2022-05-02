
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import './styles.css'
import { useParams, Link, useNavigate} from 'react-router-dom';




const Details = () => {
  
  const navigate = useNavigate()
  const [user, setuser] = useState({})
  const {username} = useParams()
  const [star, setStar] = useState(0)
  const goBack = ()=>{
    navigate('/', {state: { data: username}})
  }

   useEffect(() => {
    const getUsers = async ()=>{
      const res = await axios.get(`https://api.github.com/users/${username}`)
      const data = res.data;
      setuser(data)  

      const searchstar = res.data?.starred_url.substring(res.data?.starred_url.length -15, -15)
      const res2 = await axios.get(searchstar)
      if(res2.data){
        setStar(res2.data.length)
      }
    }

    getUsers()
  }, [])



  return (
    <>
    <div className="content bg-light container-fluid" style={{height: '100vh ', margin: 0}}>
      <div className="container">
        <Link to="/">
          <div className='text-lg text-secondary my-2 underline-none '>GitSearch</div>
        </Link>
        <button onClick={goBack} className="btn btn-secondary btn-sm mb-2">Go Back</button>
        <div className="row">
          <div className="col-10 shadow-sm p-0 m-0">
            <div className="text-center card-box">
              <div className="member-card">
                <div className="thumb-lg member-thumb mx-auto">
                  <img
                    src={user?.avatar_url}
                    className="rounded-circle img-thumbnail"
                    alt="profile"
                  />
                </div>
                <div className="">
                  <h4>{user?.login}</h4>
                </div>
                <a href={user?.html_url}>
                  <button
                    type="button"
                    className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light"
                  >
                    View Profile
                  </button>

                </a>
                <div className="mt-4">
                  <div className="row justify-content-center">
                    <div className="col-4">
                      <div className="mt-3">
                        <h4>{user?.followers || 0}</h4>
                        <p className="mb-0 text-muted">Followers</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mt-3">
                        <h4>{star || 0}</h4>
                        <p className="mb-0 text-muted">Stars</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="mt-3">
                        <h4>{user?.public_repos || 0}</h4>
                        <p className="mb-0 text-muted">Public Repo</p>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    </>
  )
}

export default Details