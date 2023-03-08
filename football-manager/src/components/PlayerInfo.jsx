import React, { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { Icon } from "./Icon";

const PlayerInfo = ({ player, index }) => {
    const [open, setOpen] = useState(-1);

    const handleOpen = (index) => {
        setOpen(open === index ? -1 : index);
    };

    return (
        <Accordion open={open === index} icon={<Icon id={index} open={open} />}>
            <img src={player.player.photo} alt="" className="w-20 h-20 object-cover rounded-full" />
            <div>
                <AccordionHeader onClick={() => handleOpen(index)} className="flex flex-col items-start font-medium border-none">
                    <div className="flex items-center justify-between w-full">
                        <h4 className="font-bold text-lg">{player.player.firstname} {player.player.lastname}</h4>
                    </div>
                    <div className="text-gray-600 text-base">{player.statistics[0].games.position}</div>
                    <div className="text-gray-600 text-base">{player.player.nationality}</div>
                    <div className="text-gray-600 text-base">{player.player.height}</div>
                    <div className="text-gray-600 text-base">{player.player.age} years old</div>
                </AccordionHeader>
                <AccordionBody>
                    {open === index && (
                        <>
                            <div className="text-gray-600 text-base">Games: {player.statistics[0].games.appearences}</div>
                            <div className={`${player.statistics[0].games.rating > 7 ? 'text-white font-bold' : 'text-gray-600'} text-base`}>
                                Rating: {player.statistics[0].games.rating}
                            </div>
                            <div className="text-gray-600 text-base">Goals: {player.statistics[0].goals.total}</div>
                            <div className="text-gray-600 text-base">Assists: {player.statistics[0].goals.assists}</div>
                            <div className="text-gray-600 text-base">Yellow cards: {player.statistics[0].cards.yellow}</div>
                            <div className="text-gray-600 text-base">Red cards: {player.statistics[0].cards.red}</div>
                        </>
                    )}
                </AccordionBody>
            </div>
        </Accordion>
    );
};

export default PlayerInfo;
