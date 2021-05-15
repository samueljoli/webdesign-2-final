import React from 'react';
import {Row, Col, Container} from "react-bootstrap"
import * as styles from './index.module.css';

const IndexPage = () => {

    return (
        <Container className={styles.container} fluid >
            <Row>
                <Col>
                    <p> Hello World </p>
                </Col>
            </Row>
        </Container>
    );
};

export default IndexPage;
