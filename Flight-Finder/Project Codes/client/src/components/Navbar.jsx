import React, { useContext } from 'react'
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import logo from '../assets/flightlogo1.png';

const Navbar = () => {

    const navigate = useNavigate();
    const usertype = localStorage.getItem('userType');

    const {logout} = useContext(GeneralContext);

  return (
    <>
        <div className="navbar">

        {!usertype ? 
        
            <> 
                <div class="logo-container">
                <img src={logo} alt="FlightFinder Logo" className="logo-circle" />
                </div>
                <h1><b>Flight Finder </b></h1>

                <div className="nav-options" >
                    
                    <p onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="material-icons">home</span>Home</p>
                    <p onClick={() => navigate('/auth')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="material-icons">person</span>Login</p>
                    
                </div>
            
            </>
        :
        
        <>
        {usertype === 'customer' ? 
        
        <>
            <div class="logo-container">
                <img src={logo} alt="FlightFinder Logo" className="logo-circle" />
                </div>
                
                <h1><b>Flight Finder </b>- Customer</h1>

            <div className="nav-options" >

                <p onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="material-icons">home</span>Home</p>
                <p onClick={()=>navigate('/bookings')}>Bookings</p>
                <p onClick={logout}>Logout</p>

            </div>
        </>
            :  usertype === 'admin' ?

                    <>
                <div class="logo-container">
                <img src={logo} alt="FlightFinder Logo" className="logo-circle" />
                </div>
                
                <h1><b>Flight Finder </b>- Admin</h1>
                        <div className="nav-options" >
                            <p onClick={() => navigate('/admin')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="material-icons">home</span>Home</p>
                            
                            <p onClick={()=>navigate('/all-users')}>Users</p>
                            <p onClick={()=>navigate('/all-bookings')}>Bookings</p>
                            <p onClick={()=>navigate('/all-flights')}>Flights</p>
                            <p onClick={logout}>Logout</p>
                        </div> 
                    </>
            
                : usertype === 'flight-operator' ?
                    <>
                           <div class="logo-container">
                <img src={logo} alt="FlightFinder Logo" className="logo-circle" />
                </div>
                
                <h1><b>Flight Finder </b>- Operator</h1>
                        <div className="nav-options" >
                            <p onClick={() => navigate('/flight-admin')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="material-icons">home</span>Home</p>
                            
                            <p onClick={()=>navigate('/flight-bookings')}>Bookings</p>
                            <p onClick={()=>navigate('/flights')}>Flights</p>
                            <p onClick={()=>navigate('/new-flight')}>Add Flight</p>
                            <p onClick={logout}>Logout</p>
                        </div> 
                    </>
            
                :

                    ""

        }
        </>
        }
        </div>
    
    </>
  )
}

export default Navbar