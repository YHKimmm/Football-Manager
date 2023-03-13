// generate dropdown options for player positions
export const playerPositionOptions = () => {
    return [
        { value: 'GK', label: 'Goalkeeper' },
        { value: 'CB', label: 'Centre Back' },
        { value: 'LB', label: 'Left Back' },
        { value: 'RB', label: 'Right Back' },
        { value: 'DM', label: 'Defensive Midfield' },
        { value: 'CM', label: 'Central Midfield' },
        { value: 'LM', label: 'Left Midfield' },
        { value: 'RM', label: 'Right Midfield' },
        { value: 'AM', label: 'Attacking Midfield' },
        { value: 'CF', label: 'Centre Forward' },
        { value: 'ST', label: 'Striker' },
    ];
}