import React, {useState, createContext} from 'react';

const Context = createContext({
    data: null,
    setData: () => {},
    isFetching: false,
    setIsFetching: () => {},
});

export default Context;

export const VaccineSpotterContext = ({children}) => {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    return (
        <Context.Provider value={{data, setData, isFetching, setIsFetching}}>
            {children}
        </Context.Provider>
    );
};
