import React, {useState} from 'react';
import {Row, Col, Container} from "react-bootstrap"
import * as styles from './index.module.css';

const FindPage = () => {
    const [zipCode, setZipCode] = useState('');
    const [radius, setRadius] = useState(0);

    const handleZipCodeUpdate = (e) => {
        setZipCode(e.target.value);
    };

    const handleRadiusChange = (e) => {
        setRadius(Number(e.target.value));
    };

    const onClick = () => {
    };

    return (
        <Container className={styles.container} fluid >
            <Row>
                <Col xs={12}>
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
                <Col xs={12}>
                    <button>Search</button>
                </Col>
            </Row>
        </Container>
    );
};

export default FindPage;
