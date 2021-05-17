import React, {useContext} from 'react';
import {Row, Col, Container, Card, Button, Spinner} from "react-bootstrap"
import VaccineSpotterContext from '../../contexts/vaccineSpotter';
import * as styles from './index.module.css';

const Loader = () => {
    return (
        <div className={styles['loadcontainer']}>
            <Spinner className={styles.loader} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

const NoData = () => {
    return (
        <div className={styles.nodata}>
            <h1>:( Sorry there was no data found</h1>
            <Button variant="warning" href="/find">Try Again</Button>
        </div>
    );
};

const MatchesPage = () => {
    const {data, isFetching, setIsFetching} = useContext(VaccineSpotterContext);

    return (
        <Container>
            {isFetching ? (<Loader/>) : (
                <div>
                    {data ? (Object.entries(data).map((entries) => {
                        const [key, provider] = entries;
                        const {
                            providerName,
                            providerUrl,
                            providerAddress,
                            locations,
                        } = provider;

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
                    })) : (<NoData />)
                    }
                </div>
            )}
        </Container>
    );

    /*
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
    */
};

export default MatchesPage;
