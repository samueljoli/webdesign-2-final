import React, {useContext} from 'react';
import {Row, Col, Container, Card, Button} from "react-bootstrap"
import VaccineSpotterContext from '../../contexts/vaccineSpotter';
import * as styles from './index.module.css';

const MatchesPage = () => {
    const {data, isFetcing, setIsFetching} = useContext(VaccineSpotterContext);
    return (
        <Container>
            {data ? (Object.entries(data).map((entries) => {
                const [key, provider] = entries;
                const {
                    providerName,
                    providerUrl,
                    providerAddress,
                    locations,
                } = provider;
                console.log(provider);
                return (
                    <>
                        <h1 className={styles.header}>We found matches for...</h1>
                        <h1>{providerName}</h1>
                            <div className={styles.cards}>
                                {locations.map(({properties}) => {
                                    return (
                                        <Card key={key} className={styles.card}>
                                            <Card.Body>
                                                <Card.Title>{`@ ${properties.address} ${properties.city} ${properties.state}`}</Card.Title>
                                                <Button className={styles.btn} href={properties.url} variant="success">Schedule Appointment</Button>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </div>
                    </>
                );
            })) : (<p>NO data</p>)}
        </Container>
    );
};

export default MatchesPage;
