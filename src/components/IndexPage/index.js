import React, {useEffect} from 'react';
import Typed from 'typed.js';
import {Row, Col, Container, Button} from "react-bootstrap"
import * as styles from './index.module.css';

const IndexPage = () => {
    useEffect(() => {
        const typed = new Typed('#intro', {
            strings: ['Help us fight covid 19. Get vaccinated.'],
            cursorChar: null,
            typeSpeed: 50,
        });

        return function clean() {
            typed.destroy();
        }
    });

    return (
        <Container className={styles.container} fluid >
            <Row>
                <Col>
                    <p id="intro"></p>
                    <Button href="/find" variant="warning" className={styles.cta}>Find Location</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
