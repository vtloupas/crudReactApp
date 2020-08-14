import React from "react";
import {Button, Table, TableBody, TableHead} from "@material-ui/core";

export default function CustomTable(props){

    return (
            <Table>
                <TableHead>
                    <tr>
                        <th>Τίτλος</th>
                        <th>Εταιρεία</th>
                    </tr>
                </TableHead>
                <TableBody>
                    {props.games.length >0 ? (
                        props.games.map((game)=>(
                            <tr key={game.id}>
                                <td hidden={true}>{game.id}</td>
                                <td>{game.title}</td>
                                <td>{game.company}</td>
                                <td>
                                    <Button className="button" onClick={()=> props.updateGame(game)}>ΕΠΕΞΕΡΓΑΣΙΑ</Button>
                                    <Button className="button" onClick={()=> props.deleteGame(game)}>Διαγραφη</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>Δεν υπάρχουν παιχνίδια</td>
                        </tr>
                    )
                    }
                </TableBody>
            </Table>
    );
}