import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";


const Activities = (props) => {
    console.log(props)


    const [activity, setActivity] = useState([])

    useEffect(()=>{
        props.getActivityByItineraryId(props.id)
        .then(res=>setActivity(res.response))
    },[])

    return(
        <>
        <div className="activitiesContainer">
        <div className="activitiesContainer2">
        <div className="activitiesContainer3">
    {activity.map(activity => {
        
        return(
        <div className="returnactivityContainer">
            <p className="asdasdsad">
                {activity.activityName}
            <img src={process.env.PUBLIC_URL +"/assets/"+ activity.activityImage} alt="photo" className="activityImages"/>
            </p>
        </div>
        )
        })}
        </div>
        </div>
        </div>
        </>
    );

}

const mapDispatchToProps = { //aca se manejan las acciones

    getActivityByItineraryId:itinerariesActions.getActivityByItineraryId
}


export default connect(null, mapDispatchToProps)(Activities);