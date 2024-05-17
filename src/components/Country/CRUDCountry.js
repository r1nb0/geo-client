import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
    Button, Container, Grid,
    Paper, TableContainer, Table, TableCell,
    TableBody, TableRow, TableHead, Dialog, DialogContent, DialogTitle
} from "@mui/material";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

export default function CRUDCountry() {


    useEffect(() => {
        fetch("https://geodata-production.up.railway.app/api/v1/countries/all")
            .then(res => res.json())
            .then((result) => {
                    setCountries(result);
                }
            )
    }, [])

    const update = (() => {
        fetch("https://geodata-production.up.railway.app/api/v1/countries/all")
            .then(res => res.json())
            .then((result) => {
                    setCountries(result);
                }
            )
    })

    const [openCities, setOpenCities] = useState(null);

    const [openLanguages, setOpenLanguages] = useState(null);

    const handleOpenLanguages = (country) => {
        setOpenLanguages(country);
    };

    const handleCloseLanguages = () => {
        setOpenLanguages(null);
    }

    const handleOpenCities = (country) => {
        setOpenCities(country);
    };

    const handleCloseCities = () => {
        setOpenCities(null);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const [startIndex, setStartIndex] = useState(0);

    const [countryIdAddLang, setCountryIdAddLang] = useState("");

    const [addLanguageName, setAddLanguageName] = useState("");

    const handleNextPage = () => {
        setStartIndex(startIndex + 4);
    };

    const handlePreviousPage = () => {
        setStartIndex(startIndex - 4);
    };

    const paperStyle = {padding:'50px 20px', width:1100, margin:"20px auto"};
    const [countries, setCountries] = useState([]);
    const handleClick = (id) => {
        fetch("https://geodata-production.up.railway.app/api/v1/countries/delete/" + id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).then(update)
    };

    const [editing, setEditing] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempNationality, setTempNationality] = useState("");
    const [tempLatitude, setTempLatitude] = useState("");
    const [tempLongitude, setTempLongitude] = useState("");

    const handleAddLanguage = (e) => {
        e.preventDefault();
        let id = countryIdAddLang;
        let languages = [addLanguageName];
        const countryDTO = {id, languages};
        fetch("https://geodata-production.up.railway.app/api/v1/countries/addLanguages", {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(countryDTO)
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

    const [newName, setNewName] = useState("");
    const [newNationality, setNewNationality] = useState("");
    const [newLongitude, setNewLongitude] = useState("");
    const [newLatitude, setNewLatitude] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();
        let name = newName;
        let nationality = newNationality;
        let longitude = newLongitude;
        let latitude = newLatitude;
        const country = {name, nationality, latitude, longitude};
        console.log(country);
        fetch("https://geodata-production.up.railway.app/api/v1/countries/create", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(country)
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

    const handleEdit = (country) => {
        setEditing(country.id);
        setTempName(country.name);
        setTempNationality(country.nationality);
        setTempLatitude(country.latitude);
        setTempLongitude(country.longitude);
    };

    const handleClickRemoveLanguage = (lang) => {
        const languages = [lang.name];
        let id = openLanguages.id;
        const countryDTO = {id, languages}
        console.log(countryDTO);
        fetch("https://geodata-production.up.railway.app/api/v1/countries/removeLanguages", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(countryDTO)
        }).then(update);
    }

    const handleAccept = (e) => {
        e.preventDefault();
        let id = editing;
        let name = newName;
        let nationality = newNationality;
        let longitude = newLongitude;
        let latitude = newLatitude;
        const countryDTO = {id, name, nationality, latitude, longitude};
        console.log(countryDTO);
        fetch("https://geodata-production.up.railway.app/api/v1/countries/updateInfo", {
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(countryDTO)
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
        setEditing(null);
    };

    const handleCancel = () => {
        setEditing(null);
    };

    return (
        <Container>
            <TableContainer component={Paper} elevation={3} style={paperStyle}>
                {/*<h1 style={{color: "blue"}}>INFO LANGUAGES</h1>*/}
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
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <TextField
                            label="Nationality"
                            value={newNationality}
                            onChange={(e) => setNewNationality(e.target.value)}
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
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <TextField
                            label="Latitude"
                            value={newLatitude}
                            onChange={(e) => setNewLatitude(e.target.value)}
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
                <Grid container spacing={3}>
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <TextField
                            label="Id country"
                            value={countryIdAddLang}
                            onChange={(e) => setCountryIdAddLang(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2} style={{display: 'flex'}}>
                        <TextField
                            label="Name language"
                            value={addLanguageName}
                            onChange={(e) => setAddLanguageName(e.target.value)}
                            variant="outlined"
                            style={{marginBottom: '10px', width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={2} style={{display: 'flex', alignItems: 'center'}}>
                        <Button variant="contained" color="success" style={{marginTop: '-10px'}}
                            onClick = {handleAddLanguage}>
                            Add language
                        </Button>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Nationality</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Remove</TableCell>
                            <TableCell>Change</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries
                            .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .slice(startIndex, startIndex + 4)
                            .map(country => (
                                <TableRow key={country.id}>
                                    <TableCell>{country.id}</TableCell>
                                    <TableCell>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Name"
                                                value = {tempName}
                                                onChange={e => setTempName(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                            />
                                        ) : (
                                            country.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Nationality"
                                                value = {tempNationality}
                                                onChange={e => setTempNationality(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                            />
                                        ) : (
                                            country.nationality
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Nationality"
                                                value = {tempLongitude}
                                                onChange={e => setTempLongitude(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                            />
                                        ) : (
                                            country.longitude
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editing === country.id ? (
                                            <TextField
                                                label = "Latitude"
                                                value = {tempLatitude}
                                                onChange={e => setTempLatitude(e.target.value)}
                                                variant = "outlined"
                                                style={{marginBottom: '10px'}}
                                            />
                                        ) : (
                                            country.latitude
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleClick(country.id)}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {editing === country.id ? (
                                            <>
                                                <Button variant="contained" color="primary" onClick={handleAccept}>
                                                    Accept
                                                </Button>
                                                <Button variant="contained" color="secondary" onClick={handleCancel}>
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="contained" color="inherit" onClick={() => handleEdit(country)}>
                                                Change
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant = "contained" color = "warning"
                                                onClick={() => handleOpenCities(country)}>
                                            Cities
                                        </Button>
                                        <Dialog onClose = {handleCloseCities} open={openCities !== null}>
                                            <DialogTitle>Список городов</DialogTitle>
                                            <DialogContent>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Id</TableCell>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Longitude</TableCell>
                                                            <TableCell>Latitude</TableCell>
                                                            <TableCell>Remove</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {openCities && openCities.cities.map(value => (
                                                            <TableRow key={value.id}>
                                                                <TableCell>{value.id}</TableCell>
                                                                <TableCell>{value.name}</TableCell>
                                                                <TableCell>{value.longitude}</TableCell>
                                                                <TableCell>{value.latitude}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant = "contained" color = "warning"
                                                onClick={() => handleOpenLanguages(country)}>
                                            Languages
                                        </Button>
                                        <Dialog onClose = {handleCloseLanguages} open={openLanguages !== null}>
                                            <DialogTitle>Список языков</DialogTitle>
                                            <DialogContent>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Id</TableCell>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Code</TableCell>
                                                            <TableCell>Remove</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {openLanguages && openLanguages.languages.map(value => (
                                                            <TableRow key={value.id}>
                                                                <TableCell>{value.id}</TableCell>
                                                                <TableCell>{value.name}</TableCell>
                                                                <TableCell>{value.code}</TableCell>
                                                                <TableCell>
                                                                    <Button variant="contained" color="secondary" onClick={() => handleClickRemoveLanguage(value)}>
                                                                        Remove
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <IconButton onClick={handlePreviousPage} disabled={startIndex === 0}>
                    <ArrowBack/>
                </IconButton>
                <IconButton onClick={handleNextPage} disabled={startIndex + 4 >= countries.length}>
                    <ArrowForward/>
                </IconButton>
            </TableContainer>
        </Container>
    );
}
