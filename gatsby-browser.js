/*
 * This file is where you'll pull in styling that is global to all css or
 * scss files
 */
import "./src/styles/global.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"
import {VaccineSpotterContext} from './src/contexts/vaccineSpotter';

export const wrapRootElement = ({ element }) => {
    return(
        <VaccineSpotterContext>{element}</VaccineSpotterContext>
    );
};


