import React from "react";
import { withRouter } from "react-router";
import SearchAppBar from "../Bar/Bar";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
const DashboardComponent=()=>{
    return(
        <div>
            <SearchAppBar/>
            <Container maxWidth="sm">
                <div style={styles}>
                    <h1>Caro online project make by HLL</h1>
                    <p>Click to play 👇</p>
                    <Button variant="contained" color="secondary">
                        Play
                    </Button>
                </div>    
            </Container>
        </div>
    )
}

export default withRouter(DashboardComponent);