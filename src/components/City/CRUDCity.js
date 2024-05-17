import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
    Button, Container, Grid, Paper,
    Table, TableCell,
    TableBody, TableRow, TableHead, TableContainer
} from "@mui/material";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

export default function CRUDCity() {

    useEffect(() => {
        fetch("https://geodata-production.up.railway.app/api/v1/cities/all")
            .then(res => res.json())
            .then((result) => {
                    setCities(result);
                }
            )
    }, [])

    const update = (() => {
        fetch("https://geodata-production.up.railway.app/api/v1/cities/all")
            .then(res => res.json())
            .then((result) => {
                    setCities(result);
                }
            )
    })

    const [editing, setEditing] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempLatitude, setTempLatitude] = useState("");
    const [tempLongitude, setTempLongitude] = useState("");

    const [newName, setNewName] = useState("");
    const [newLatitude, setNewLatitude] = useState("");
    const [newLongitude, setNewLongitude] = useState("");
    const [newCountryName, setNewCountryName] = useState("")

    const [searchTerm, setSearchTerm] = useState("");

    const [startIndex, setStartIndex] = useState(0);

    const handleNextPage = () => {
        setStartIndex(startIndex + 4);
    };

    const handlePreviousPage = () => {
        setStartIndex(startIndex - 4);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        let name = newName;
        let countryName = newCountryName;
        let longitude = newLongitude;
        let latitude = newLatitude;
        const city = {name, countryName, latitude, longitude};
        console.log(city);
        fetch("https://geodata-production.up.railway.app/api/v1/cities/create", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(city)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then(() => update())
            .catch(error => {
                alert(`Произошла ошибка: ${error.message}`);
            });
    }

    const handleAccept = (e) => {
        e.preventDefault();
        let id = editing;
        let name = tempName;
        let latitude = tempLatitude;
        let longitude = tempLongitude;
        const city = {id, name, longitude, latitude}
        console.log(city);
        fetch("https://geodata-production.up.railway.app/api/v1/cities/updateInfo", {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(city)
        }).then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
            .then(() => update())
            .catch(error => {
                alert(`Произошла ошибка: ${error.message}`);
            });
        setEditing(null);
    }

    const handleCancel = () => {
        setEditing(null);
    }

    const handleEdit = (city) => {
        setEditing(city.id);
        setTempName(city.name);
        setTempLatitude(city.latitude);
        setTempLongitude(city.longitude);
    };

    const paperStyle = {padding:'50px 20px', width:850, margin:"20px auto"};
    const [cities, setCities] = useState([]);
    const handleClick = (id) => {
        fetch("https://geodata-production.up.railway.app/api/v1/cities/delete/" + id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).then(update)
    };

    return (
        <Container>
            <TableContainer component={Paper} elevation={3} style={paperStyle}>
                {/*<h1 style={{color: "blue"}}>INFO CITIES</h1>*/}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px'}}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <TextField
                            label="Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={3} style={{display: 'flex'}}>
                        <TextField
                            label="Country name"
                            value={newCountryName}
                            onChange={(e) => setNewCountryName(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <TextField
                            label="Latitude"
                            value={newLatitude}
                            onChange={(e) => setNewLatitude(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <TextField
                            label="Longitude"
                            value={newLongitude}
                            onChange={(e) => setNewLongitude(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2} style={{display: 'flex', alignItems: 'center'}}>
                        <Button variant="contained" color="success" style={{marginTop: '-10px'}}
                                onClick={handleCreate}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Remove</TableCell>
                            <TableCell>Change</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities
                            .filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .slice(startIndex, startIndex + 4)
                            .map(city => (
                                <TableRow key={city.id}>
                                    <TableCell>{city.id}</TableCell>
                                    <TableCell>
                                        {editing === city.id ? (
                                            <TextField
                                                label = "Name"
                                                value = {tempName}
                                                onChange={e => setTempName(e.target.value)}
                                                variant = "outlined"
                                                style = {{marginBottom: '10px'}}
                                            />
                                        ) : (
                                            city.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editing === city.id ? (
                                            <TextField
                                                label = "Longitude"
                                                value = {tempLongitude}
                                                onChange={e => setTempLongitude(e.target.value)}
                                                variant = "outlined"
                                                style = {{marginBottom: '10px'}}
                                            />
                                        ) : (
                                            city.longitude
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editing === city.id ? (
                                            <TextField
                                                label = "Latitude"
                                                value = {tempLatitude}
                                                onChange={e => setTempLatitude(e.target.value)}
                                                variant = "outlined"
                                                style = {{marginBottom: '10px'}}
                                            />
                                        ) : (
                                            city.latitude
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary"
                                                onClick={() => handleClick(city.id)}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {editing === city.id ? (
                                            <>
                                                <Button variant="contained" color="primary" onClick={handleAccept}>
                                                    Accept
                                                </Button>
                                                <Button variant="contained" color="secondary" onClick={handleCancel}>
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="contained" color="inherit" onClick={() => handleEdit(city)}>
                                                Change
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <IconButton onClick={handlePreviousPage} disabled={startIndex === 0}>
                    <ArrowBack/>
                </IconButton>
                <IconButton onClick={handleNextPage} disabled={startIndex + 4 >= cities.length}>
                    <ArrowForward/>
                </IconButton>
            </TableContainer>
        </Container>
    );
}
