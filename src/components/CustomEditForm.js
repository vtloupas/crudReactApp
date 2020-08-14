import React, {useEffect, useState} from "react";
import {FormGroup, FormControl, InputLabel , Input, Button, Container} from "@material-ui/core";

const EditGameForm = (props) => {

    const [formGame, setFormGame] = useState(props.gameForUpdate)

    useEffect(() => {
        setFormGame(props.gameForUpdate)
    },[props])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormGame(prevState =>({
            ...prevState,
            [name]: value
        }))
    }

    const handleOnSubmitGame = async (event) => {
        event.preventDefault()
        if (!formGame.title || !formGame.company) return
        props.saveUpdateGame(props.gameForUpdate,formGame)
    }

    return (
        <Container>
            <h3>Επεξεργασία νέου παιχνιδιού</h3>
            <form onSubmit={handleOnSubmitGame}>
                <FormGroup>
                    <FormControl>
                        <InputLabel htmlFor="title">Τίτλος</InputLabel >
                        <Input id="title" type="text" name="title" value={formGame.title} onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="company">Εταιρεία</InputLabel >
                        <Input id="company" type="text" name="company" value={formGame.company} onChange={handleInputChange}/>
                    </FormControl>
                    <Button type="submit" value="submit">ΑΠΟΘΗΚΕΥΣΗ ΠΑΙΧΝΙΔΙΟΥ</Button>
                    <Button onClick={()=>(props.setEditing(false))}>Ακυρωση</Button>
                </FormGroup>
            </form>
        </Container>
    )
}

export default EditGameForm