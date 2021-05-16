import React, {useState, useContext} from 'react';
import {Row, Col, Container} from "react-bootstrap"
import Geo from '../../services/geo';
import VaccineSpotterContext from '../../contexts/vaccineSpotter';
import * as styles from './index.module.css';
import { Link } from "gatsby"

const FindPage = () => {
    const {setData, isFetcing, setIsFetching} = useContext(VaccineSpotterContext);
    const [zipCode, setZipCode] = useState('');
    const [radius, setRadius] = useState(0);

    const handleZipCodeUpdate = (e) => {
        setZipCode(e.target.value);
    };

    const handleRadiusChange = (e) => {
        setRadius(Number(e.target.value));
    };

    const onClick = async () => {
        setIsFetching(true);
        const res = await Geo.findLocations(zipCode, radius);
        setData(res);
        setIsFetching(false);
    };

    return (
        <Container className={styles.container} fluid >
            <Row>
                <Col className={styles.fade} xs={12}>
                    {isFetcing && (<p> is fetching </p>)}
                    <span>
                        Find a location at zipde:
                    </span>
                    <span>
                        <input onChange={handleZipCodeUpdate} />
                    </span>
                    <span>
                        within:
                    </span>
                    <span>
                        <input type="number" id="quantity" name="quantity" min="1" max="100" onChange={handleRadiusChange} />
                    </span>
                    <span>
                        miles
                    </span>
                </Col>
                <Col className={styles.fade} xs={12}>
                    <Link className={styles.link} to="/matches" onClick={onClick}>Search</Link> <span className={styles.emoji}>💉</span>
                </Col>
            </Row>
        </Container>
    );
};

export default FindPage;
