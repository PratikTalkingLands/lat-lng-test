import React, { useState, useRef } from "react";
import Axios from 'axios'
import './App.css'
import Map from './Map';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, CircleMarker, Polyline, ScaleControl } from 'react-leaflet';
// import { marker } from "leaflet";
import { useMemo } from "react";
import axios from "axios";
// import { ToastContainer, Toast } from "react-toastify";
import { map } from "leaflet";
//import { Toast } from "react-toastify/dist/components";
import ToastMsg from './ToastMsg';


function Sidenav(props) {
    //console.log(props)
    const coordinates = [props.latpoints, props.lngpoints]
    const bounds = props.center
 
    // const centerCoordinate = [props.clatpoints, props.clngpoints]

    const fileInputRef = useRef(null)

    // const url = "kia"
    const [data, setData] = useState({
        title:"",
        img:"",
        imgdesc: "",
        description:""
    })


    // const [image, setImage] = useState()


    /*function submit(e) {
        e.preventDefault();
        Axios.post(url, {
            latitude: data.latitude,
            longitude: data.longitude,
            story: data.story
        })
        .then(res=>{
            console.log(res.data)
        })
    }*/

    // url = https://jsonbase-8e899-default-rtdb.firebaseio.com

    /*const [details, setDetails] = useState({
        lat: '',
        long: '',
        story: '',
       
    })*/

    /*const postData = async(e) => {
        e.preventDefault()
        const{lat, long, story} = details;
        const res = await fetch("https://jsonbase-8e899-default-rtdb.firebaseio.com/latlng.json",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                lat,
                long,
                story,
            })
        })
    }*/


    // Handle function for seting the data in the form
    //LatLng are comming from props from the Map.js component
    function handle(e) {
        const newData = e.target.value;

        setData({
            ...data,
            [e.target.name]:newData
        })

    }
   
    

    const handleImage = (e) => {
       
        e.preventDefault()
        let src = URL.createObjectURL(e.target.files[0])
        //console.log(e.target.files[0].name)
        let imgName = e.target.files[0].name
        setData(()=>({
            ...data,
            img:URL.createObjectURL(e.target.files[0])
        }))
    }

    let alldata = {
        data:data,
        coordinates:coordinates,
        bounds:bounds
    }

    const handleOnCLick = async (e) => {
        e.preventDefault();
        console.log(data)
        axios.post('https://jsonbase-8e899-default-rtdb.firebaseio.com/sample.json', alldata)
            .then(response => console.log("response", response))
            .catch(json => console.log(json))
            alert("Data Submitted")
    }

    // const showToast = () => {
    //     alert("Data Submitted")
    // }
    return (
        <div className='sidebar'>
            <div className='title'>
                <h1>Talking Lands</h1>
            </div>
            <form className="story-form">
                <input onChange={handle} type="text" value={data.title} name="title" placeholder="Title of the Tale"/>
                <input onChange={handle}   type="text"  value={data.imgdesc} placeholder="Imagesdesc" name="imgdesc" />
                {/* <input onChange={(e) => handle(e)} type="text" id="longitude" value={props.lngpoints} placeholder="Longitude" name="longitude" /> */}
                {/* <input type="text" id="centerCoordinate" value={centerCoordinate} placeholder="Center of the map" name="placeholder" hidden/> */}
                <input onChange={ handle} type="text" id="story" value={data.description} name="description" placeholder="Enter your story" style={{ "height": 80 }} />
                <input
                    type="file"
                    multiple={true}
                    ref={fileInputRef}
                    name="img"
                    onChange={handleImage}         
                />

                {/* <button
                    className='user-change-btn'
                    onClick={() => fileInputRef.current.click()}
                    hidden
                    >
                    Change profile
                </button> */}

                <button onClick={handleOnCLick}  type="click" id="submit-btn">Enter Story</button>

            </form>
        </div>
    );
}

export default Sidenav;