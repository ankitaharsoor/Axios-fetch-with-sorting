import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
function Get() {
    const [data, setData]  = useState('');
    const [search, setSearch]  = useState("");
    const [ascending,setAscending] = useState([]);
    const [descending,setDescending] = useState([]);
     
   const getAllData = () => {

        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            // console.log(response.data);
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
                useEffect(() => {
                    getAllData();
                },[]);
        
                let sortAscending = () => {
                    let {id} = data;
                    let ascending = data.sort((a, b) => {
                      return a.id - b.id;
                    });
                    setAscending(ascending);
                    console.log(ascending);
                  };
                  let sortDescending = () => {
                    let { id } = data;
                    let descending = data.sort((a, b) => {
                      return b.id - a.id;
                    });
                    setDescending(descending);
                    console.log(descending);
                  };
                 
                
                  let ascendingData = ascending
                    .filter(data => {
                      if (search === "") {
                        return data;
                      } else if (data.title.toLowerCase().includes(search.toLowerCase())) {
                        return data;
                        // console.log(val.title);
                      }
                    })
                    .map(data => (
                      <div key={data.id}>
                        <h1>{data.id}</h1>
                        <h1>{data.title}</h1>
                      </div>
                    ));
                
              let descendingData = descending
                    .filter(data => {
                      if (search === "") {
                        return data;
                      } else if (data.title.toLowerCase().includes(search.toLowerCase())) {
                        return data;
                        console.log(data.title);
                      }
                    })
                    .map(data => (
                      <div key={data.id}>
                        <h1>{data.id}</h1>
                        <h1>{data.title}</h1>
                      </div>
                    ));    
           



        return (
                <>
            
                    <input
                    type="text"
                    className="search-box"
                    placeholder="Search here..."
                    onChange={(e) =>{
                        setSearch(e.target.value)
                    }}/>

                    <button className='btn' onClick={sortAscending}>
                        Ascending
                    </button>
                    <button className='btn' onClick={sortDescending}>
                        Descending
                    </button>
                    <div className='asc'>{ascendingData}</div>
                    <span>
                    <div className='dsc'>{descendingData}</div>
                    </span>

                  {data ?
                    data
                        .filter((data) => {
                        if (search == "") {
                            return data;
                        } else if (data.title.toLowerCase().includes(search.toLowerCase())) {
                            return data;
                        }
                        })
                        .map((data) => {
                        return (
                            <h2>
                                {data.id}
                                <br />
                            {data.title}
                            </h2>
                             );
                        }
                        ) : <h2 key={data.id} >{data.id}</h2>
                       }
                    {data ? 
                        data.map(data => {
                            return(

                            <div className="data" key={data.id}>
                                {/* <h3>{data.title}</h3> */}
                            </div>
                            )
                        }) : <h3>No data yet</h3> }
               
 </>
                
)
}


export default Get;
