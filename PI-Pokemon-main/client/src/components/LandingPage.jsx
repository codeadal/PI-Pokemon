import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage (){
    return (
        <div>
            <h>Bienvenidos a mi Pagina de Pokemon</h>
            <Link to = '/home'>
                <button> Enter </button>
            </Link>
        </div>
    )
}
