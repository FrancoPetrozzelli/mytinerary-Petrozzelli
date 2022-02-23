import { UilInstagram } from '@iconscout/react-unicons'
import { UilTwitterAlt } from '@iconscout/react-unicons'
import { UilGithubAlt } from '@iconscout/react-unicons'
import {Link} from 'react-router-dom'


const FooterMain = () => {
    return ( 
        <>
        <div className="footerContainer">
    <footer className="w-100 py-4">
        <div className="container py-4">
            <div className="row d-flex justify-content-between">
            <ul className="list-unstyled text-muted d-flex col justify-content-center align-items-center">
                        <li className='w-100'><Link to='/'><img className='logoFooter' src = '../assets/logo.png'/></Link></li>
                        <li className='w-100'><a href="https://www.instagram.com/franco.petro13/" target='blank'><UilInstagram className="uil uil-instagram m-2 uilFooter"></UilInstagram></a></li>
                        <li className='w-100'><a href="https://twitter.com/franco_petro" target='blank'><UilTwitterAlt className="uil uil-twitter m-2 uilFooter"></UilTwitterAlt></a></li>
                        <li className='w-100'><a href="https://github.com/FrancoPetrozzelli" target='blank'><UilGithubAlt className="uil uil-github m-2 uilFooter"></UilGithubAlt></a></li>
                    </ul>
                <div className="col-lg-2 col-md-6">
                    <h5 className="text-white mb-3">Quick links</h5>
                    <ul className="list-unstyled text-muted">
                    <Link to="/"><ul className='navFooter'>Home</ul></Link>
                    <Link to="/cities"><ul className='navFooter'>Cities</ul></Link>
                        
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-white mb-3">News</h5>
                    <p className="small text-muted">Don't forget to visit our page to get new information about our itineraries.</p>
                </div>
            </div>
            <p className="small text-muted mb-0">&copy; Copyrights. All rights reserved. Franco Petrozzelli</p>
        </div>
    </footer>
</div>
    </>

    );
}

export default FooterMain;