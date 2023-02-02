import { Home, Search } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router';

type Props = {
	letters: string[],
	letter: string
}

export const LetterTab = ({ letters, letter }: Props) => {
	const navigate = useNavigate()
	return <ToggleButtonGroup
		value={letter}
		exclusive
		fullWidth
		onChange={(_event, value) => navigate("/" + value)}
	>
		<ToggleButton value="home"><Home /></ToggleButton>
		{letters.sort().map(letter => <ToggleButton key={letter} value={letter}>{letter}</ToggleButton>)}
		<ToggleButton value="_">Alle</ToggleButton>
		<ToggleButton value="search"><Search /></ToggleButton>
	</ToggleButtonGroup>
}
