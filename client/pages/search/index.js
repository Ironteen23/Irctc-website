import React, { useEffect } from "react";
import styles from "../../styles/Search.module.css";
import { useContext } from "react";
import AppContext from "../../components/AppContext/AppContext";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const index = () => {
  const [user, setUser] = useState({ src: "", dest: "", date: "" });
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState(false);
  const [detarr, setDetarr] = useState([]);
  const [loginwarning, setLoginWarning] = useState(false);

  const myContext = useContext(AppContext);

  // state = {
  //   detarr: [],
  // };

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prevState) => {
      console.log(user);
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  //   const data = [];

  // useEffect(() => {
  //   handleSubmit;
  // }, []);
  // const saveDets = (dets) => {
  //   setDetarr(dets);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked on button");
    console.log(user);
    const submitValues = { ...user };
    console.log("Values submitted: ", submitValues);
    const response = await fetch(
      "http://localhost:5000/api/v1/trains/specific",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitValues),
      }
    );
    if (response.status === 200) {
      //   detarr =
      //   const data = response.json();
      //   setDetarr(data);

      setShow(true);
      setDetails(true);
      toast.success("REQ successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // toast.info(`Confirmation email sent`);
    } else if (response.status === 400) {
      setShow(true);
      toast.error(`NO TRAINS`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (response.status === 500) {
      setShow(true);
      toast.error(`INTERNAL ERROR`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // setLoading(false);
    const data = await response.json();
    // .then(() => {
    //   setDetarr(data);
    // })
    // .catch((err) => {
    //   console(err);
    // });
    // if (response.status === 200) {
    //   while (!data || data.length == 0) setDetarr(data);
    // }
    // saveDets(data);
    // this.setState({ detarr: data });
    setDetarr(data.trains);
    console.log("detarr1");
    console.log(detarr);
    console.log("data");
    console.log(data);
  };

  useEffect(() => {
    handleSubmit;
    console.log("detarr2");
    console.log(detarr);
    // setDetarr(data);
  }, [detarr]);

  const pleaseLogin = () => {
    setLoginWarning(true);
    toast.error(`PLEASE LOGIN`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className={styles["search-bar"]}>
        <div className={styles["input-outer-cont"]}>
          <h2 style={{ textAlign: "left" }}>From</h2>
          <input
            placeholder="From"
            className={styles["input-cont"]}
            name="src"
            onChange={handleChange}
          />
        </div>

        <div className={styles["input-outer-cont"]}>
          <h2 style={{ textAlign: "left" }}>To</h2>
          <input
            placeholder="To"
            className={styles["input-cont"]}
            name="dest"
            onChange={handleChange}
          />
        </div>
        <div className={styles["input-outer-cont"]}>
          <h2 style={{ textAlign: "left" }}>Date</h2>
          <input
            placeholder="03-11-2022"
            className={styles["input-cont"]}
            name="date"
            onChange={handleChange}
          />
        </div>

        <button className={styles["search-btn"]} onClick={handleSubmit}>
          Modify Search
        </button>
      </div>
      {show ? (
        <>
          <ToastContainer />
        </>
      ) : null}

      {details ? (
        <>
          {detarr ? (
            <div>
              {detarr?.map((arr) => {
                return (
                  <div className={styles["train-info-cont"]}>
                    <h1 className={styles["train-name"]}> {arr.name}</h1>
                    <h1 className={styles["train-date"]}>{arr.date}</h1>
                    <h2 className={styles["train-id"]}>Train id :{arr._id}</h2>
                    <h3 className={styles["train-dist"]}>{arr.distance}km</h3>
                    <h2 className={styles["train-src"]}>
                      {arr.depTime} |{arr.src}
                    </h2>
                    <h2 className={styles["train-dest"]}>
                      {arr.arrivalTime} |{arr.dest}
                    </h2>
                    <div className={styles["train-coach-cont"]}>
                      <div className={styles["train-coach"]}>
                        <h2>GENERAL</h2>
                        <h3 style={{ color: "green" }}>
                          Available: {arr.genSeats}
                        </h3>
                        <h3>Fare :{arr.genFare}</h3>
                      </div>
                      <div className={styles["train-coach"]}>
                        <h2>3 AC</h2>
                        <h3 style={{ color: "green" }}>
                          Available: {arr.ACSeats}
                        </h3>
                        <h3>Fare :{arr.acFare}</h3>
                      </div>
                      {myContext.isloggedIn &&
                      myContext.loggedusername !== "Admin" ? (
                        <Link href={"/search/" + arr._id} key={arr._id}>
                          <button className={styles["book-btn"]}>
                            BOOK NOW
                          </button>
                        </Link>
                      ) : myContext.loggedusername === "Admin" ? null : (
                        <button
                          className={styles["book-btn"]}
                          onClick={pleaseLogin}
                        >
                          Book Now
                        </button>
                      )}
                      {myContext.loggedusername === "Admin" ? (
                        <Link href={"/search/" + arr._id}>
                          <button className={styles["book-btn"]}>Modify</button>
                        </Link>
                      ) : null}
                      {loginwarning ? <ToastContainer /> : null}
                    </div>
                  </div>
                );
              })}
              {/* <h1>{detarr[0].name}</h1>
              <h1>{detarr[0]._id}</h1> yo pepe yo pepe yo pops */}
            </div>
          ) : (
            <h1>NO TRAINS AVAILABLE</h1>
          )}
        </>
      ) : (
        <h1>NO TRAINS AVAILABLE</h1>
      )}
      {myContext.loggedusername === "Admin" ? (
        <div className={styles["create-cont"]}>
          <h2> Create Train</h2>
          <Link href={"/createtrains/"}>
            <button className={styles["book-btn-2"]}>Create </button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default index;
