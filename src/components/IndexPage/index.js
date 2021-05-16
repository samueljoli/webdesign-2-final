import React, {useEffect} from 'react';
import Typed from 'typed.js';
import {Row, Col, Container} from "react-bootstrap"
import * as styles from './index.module.css';
// import { TEST_CASE } from "gatsby-env-variables"

const IndexPage = () => {
    useEffect(() => {
        const typed = new Typed('#meme', {
            strings: ['Help us fight covid 19. Get vaccinated'],
            cursorChar: null,
            typeSpeed: 50,
        });

        return function clean() {
            typed.destroy();
        }
    });

    const onClick = () => window.location.href = '/find';

    return (
        <Container className={styles.container} fluid >
            <Row>
                <Col>
                    <p id="meme"></p>
                    <button onClick={onClick} className={styles.cta}>Find Location</button>
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
