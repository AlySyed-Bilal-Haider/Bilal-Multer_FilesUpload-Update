import axios from "axios";
import React, { useEffect, useState } from "react";
import Editeprofile from "./UpdateModal";
import "./Table.css";
function UserRecord() {
  const [data, setdata] = useState([]);
  const [open, setOpenstate] = useState(false);
  const [filterResult, setFilterState] = useState({
    _id: "",
    email: "",
    image: "",
    imgID: "",
  });

  const [totalpages, setTotalpages] = useState("");
  const URL = "http://localhost:8080";
  const limit = 3;
  /////////////Fetch all record from server side ///////////
  const fetchUserRecord = async (page = 1) => {
    try {
      console.log("page here:", page);
      const { data } = await axios.get(
        `${URL}/alluser?page=${page}&limit=${limit}`
      );
      console.log("data record:", data);
      setdata(data?.data);
      setTotalpages(data?.totalPages);
    } catch (error) {
      console.log("user record Error:", error);
    }
  };

  useEffect(() => {
    fetchUserRecord();
  }, []);
  /////////Update file and user data///////////
  const fetchUpdateuser = (id, specificImg, imgID) => {
    const result = data?.find((items) => {
      return items?._id == id;
    });

    setFilterState({
      ...filterResult,
      _id: result?._id,
      email: result?.email,
      image: specificImg,
      imgID: imgID,
    });
    setOpenstate(true);
  };
  ////////////Pagination here////////

  let menuItems = [];
  for (var i = 1; i <= totalpages; i++) {
    menuItems.push(<a>{i}</a>);
  }

  const paginationsHandles = (pages) => {
    console.log("pages:", pages);
    fetchUserRecord(pages);
  };
  return (
    <>
      <Editeprofile open={open} func={setOpenstate} userInfo={filterResult} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <table>
          <tr>
            <th>Email</th>
            <th>Pictures</th>
            <th>Update</th>
          </tr>
          {React.Children.toArray(
            data?.map(({ _id, email, image }, index) => {
              return (
                <tr key={index} style={{ borderBottom: "1px solid lightgray" }}>
                  <td>{email}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      {React.Children.toArray(
                        image?.map((items) => {
                          return (
                            <div>
                              <img
                                style={{
                                  width: "40px",
                                  height: "60px",
                                  margin: "3px",
                                  cursor: "pointer",
                                }}
                                src={URL + `/upload/${items?.img}`}
                                alt="Muilter"
                                onClick={() => {
                                  fetchUpdateuser(_id, items?.img, items?.id);
                                }}
                              />
                            </div>
                          );
                        })
                      )}
                    </div>
                  </td>
                  <td style={{ cursor: "pointer" }}>Update</td>
                </tr>
              );
            })
          )}
        </table>
        <br />
        <div className="pagination">
          <a href="#">&laquo;</a>
          {menuItems?.length > 0 &&
            menuItems.map((items, index) => {
              return (
                <a
                  style={{ cursor: "pointer" }}
                  key={index}
                  onClick={() => {
                    paginationsHandles(index + 1);
                  }}
                >
                  {index + 1}
                </a>
              );
            })}
          <a href="#">&raquo;</a>
        </div>
      </div>
    </>
  );
}

export default UserRecord;
