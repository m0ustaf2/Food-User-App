import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaHeart } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import ChangePass from '../../../AuthModule/Components/ChangePass/ChangePass';
import logo from "../../../assets/images/3.png";

export default function SideBar() {
  let [isCollapsed, setIsCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let handleToggle=()=>{
    setIsCollapsed(!isCollapsed)
  }
  let navigate=useNavigate();
  let logOut=()=>{
    localStorage.removeItem("userToken");
    navigate('/login')
  }
  return (
    <>
   <div className='sidebar-container  vh-100'>
      <Modal show={show} onHide={handleClose}>
        
        <Modal.Body>
          <ChangePass handleClose={handleClose}/>
        </Modal.Body>
        
      </Modal>
   <Sidebar collapsed={isCollapsed}>
  <Menu>
    <div onClick={handleToggle}>
    <img className='w-75' src={logo} alt='logo'/>
    </div>
  <MenuItem icon={<IoMdHome className='fs-4' />} component={<Link to="/dashboard" />}>Home</MenuItem>
    <MenuItem icon={<LiaPizzaSliceSolid className='fs-4'/>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
    <MenuItem icon={<FaHeart className='fs-4' />} component={<Link to="/dashboard/favorites" />}> Favorites</MenuItem>
    <MenuItem icon={<FaKey className='fs-4' />} onClick={handleShow}>Change Password</MenuItem>
    <MenuItem icon={<IoLogOutOutline className='fs-4' />} onClick={logOut}>Logout</MenuItem>
  </Menu>
</Sidebar>
   </div>
    
    </>
  )
}
