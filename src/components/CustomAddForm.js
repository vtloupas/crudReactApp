import React, {useState} from "react";
import {FormGroup, FormControl, InputLabel , Input, Button, Container} from "@material-ui/core";
import QueriesFunctions from "./QueriesFunctions";

const AddGameForm = (props) => {

    const initialFormState = {id:null, title:'', company: '' }
    const [game, setGame] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setGame(prevState =>({
            ...prevState,
            [name]: value
        }))
    }

    const handleOnSubmitGame = async (event) => {
        event.preventDefault()
        if (!game.title || !game.company) return
        props.addGame(game)
        setGame(initialFormState)
        await QueriesFunctions.putGame(game)
    }

    return (
        <Container>
            <h3>Εισαγωγή παιχνιδιού</h3>
            <form onSubmit={handleOnSubmitGame}>
                <FormGroup>
                    <FormControl>
                        <InputLabel htmlFor="title">Τίτλος</InputLabel >
                        <Input id="title" type="text" name="title" value={game.title} onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="company">Εταιρεία</InputLabel >
                        <Input id="company" type="text" name="company" value={game.company} onChange={handleInputChange}/>
                    </FormControl>
                    <Button value="Submit" type="submit">ΠΡΟΣΘΗΚΗ ΠΑΙΧΝΙΔΙΟΥ</Button>
                </FormGroup>
            </form>
        </Container>
    )
}

export default AddGameForm