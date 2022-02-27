import {Link} from 'react-router-dom'


const Calltoaction = () => {
    return ( 
        <>
            
        <div className="courses-container">
        <div className="course">
            <div className="course-preview">
            </div>
            <div className="course-info d-flex  justify-content-center align-items-center">
                <h4>It's time to pack your bags and get ready for your next adventure. Check out the tours we're running until the end of the year, and if you see something that's up your alley, book away! We're just as excited as you to explore our big, beautiful world.</h4>
            
            </div>
            <div className='buttonHeaderContainer'>
            <Link to='/cities' className='buttonHeader'><span></span></Link>
            </div>
        </div>
    </div>
            
        </>
    );
}  

export default Calltoaction;