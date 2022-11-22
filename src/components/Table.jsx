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

  const URL = "http://localhost:8080";
  const fetchUserRecord = async () => {
    try {
      const { data } = await axios.get(`${URL}/alluser`);
      setdata(data?.data);
      console.log("data:", data?.data);
    } catch (error) {
      console.log("user record Error:", error);
    }
  };

  useEffect(() => {
    fetchUserRecord();
  }, []);
  // src={`${url}/upload/${alldetailsstate[i]?.user?.img}`}

  /////////Update file and user data///////////
  const fetchUpdateuser = (id, specificImg, imgID) => {
    const result = data?.find((items) => {
      return items?._id == id;
    });
    console.log(specificImg);
    setFilterState({
      ...filterResult,
      _id: result?._id,
      email: result?.email,
      image: specificImg,
      imgID: imgID,
    });
    setOpenstate(true);
  };
  console.log("filterResult:", filterResult);
  return (
    <>
      <Editeprofile open={open} func={setOpenstate} userInfo={filterResult} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
                          console.log("img:", items?.img);
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
      </div>
    </>
  );
}

export default UserRecord;
