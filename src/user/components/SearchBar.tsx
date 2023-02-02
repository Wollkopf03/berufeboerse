import { Autocomplete, styled, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { EntryType } from './Entry';

type Props = {
	entries: EntryType[]
}

export function SearchBar({ entries }: Props) {

	const GroupHeader = styled('div')(({ theme }) => ({
		position: 'sticky',
		top: '-8px',
		padding: '4px 10px',
		color: theme.palette.primary.main
	}));

	const GroupItems = styled('ul')({
		padding: 0,
	});

	const options = entries.map((option) => {
		const firstLetter = option.name[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option
		};
	});

	return (
		<Autocomplete
			id="grouped-demo"
			options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => option.name}
			sx={{ width: 300, mt: 2 }}
			renderInput={(params) => <TextField {...params} label="Betriebe" />}
			renderGroup={(params) => (
				<li>
					<GroupHeader>{params.group}</GroupHeader>
					<GroupItems>{params.children}</GroupItems>
				</li>
			)}
			renderOption={(props, option, { inputValue }) => {
				const matches = match(option.name, inputValue, { insideWords: true });
				const parts = parse(option.name, matches);

				return (
					<li {...props}>
						<div>
							{parts.map((part, index) => (
								<span
									key={index}
									style={{
										fontWeight: part.highlight ? 700 : 400,
									}}
								>
									{part.text}
								</span>
							))}
						</div>
					</li>
				);
			}}
		/>
	)
}