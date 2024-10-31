import { Link } from "react-router-dom";
import './StudentHome.css'
import StudentModal from "../StudentModal/StudentModal";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types'

const StudentHome = (props) => {
    const [modal, setModal] = useState(false);

    const fetchUser = async () => {
        await axios.get("http://localhost:5000/api/student/home")
        .then(result => {
            console.log(result); //testing
        })
        .catch(err => console.error(err));
    }
    useEffect(() => {
        fetchUser();
    })
    
    const toggleModal = () => {
        setModal(!modal);
    }
    return (
        <> 
            <div className="std-home-wrapper">
                {modal && 
                    <StudentModal toggleModal={toggleModal}/>
                }

                <div className="std-home-container flex">
                    <div className="std-header flex">
                        <img src="../../public/favicon.ico" width={"50px"}/>
                        <div className="std-logout-btn flex">
                            <Link to="/" className="std-link">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>&nbsp;&nbsp;Log Out</span>
                            </Link>
                        </div>
                    </div>
                    <div className="std-navbar flex">
                        <div className="std-profile">
                            <div className="std-profile-content flex">
                                <i className="fa-solid fa-user fa-2xl" style={{color: "#ffffff;"}}></i>
                                <div className="std-profile-text">
                                    <span><b>{props.name}</b></span><br />
                                    <span>{props.userID}</span>
                                </div>
                            </div>
                        </div>
                        <div className="std-req-btn flex"  onClick={toggleModal}>
                            <i className="fa-solid fa-plus fa-sm"></i>
                            <span>New Request</span>
                        </div> 
                    </div>

                    <span className="std-table-cap">Your Requests</span>
                    <div className="std-record"> {/*TODO */}
                        <table className="std-record-table" border={"2px solid black"}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Purpose</th>
                                    <th>Time Out</th>
                                    <th>Time In</th>
                                    <th>Number of Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                </tr>
                                <tr>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                    <td>dwdaw</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

StudentHome.propTypes = {
    name: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired
}

export default StudentHome;