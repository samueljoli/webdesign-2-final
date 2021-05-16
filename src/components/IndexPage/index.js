import React from 'react';
import {Row, Col, Container} from "react-bootstrap"
import * as styles from './index.module.css';
import { TEST_CASE } from "gatsby-env-variables"

const IndexPage = () => {
    console.log(TEST_CASE, '<< what is this');
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
