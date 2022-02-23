
import React from 'react';
import useStore from '../hooks/useStore';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = ({ children }) => {
    const { signed, loading } = useStore();

    if (false) {
        return (
            <div style={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                alignSelf: "center",
                alignContent: "center"
            }}>
                <h1>Carregando...</h1>
            </div>
        );
    }

    return true ? <AppRoutes children={children} /> : <AuthRoutes />;
}

export default Routes;
