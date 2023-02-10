import { Grid, Typography } from '@mui/material'
import { Entry, EntryType } from './Entry'

type Props = {
	id: string,
	name: string,
	entries: EntryType[]
}

export function Category({ id, name, entries }: Props) {
	return (
		<>
			<Typography variant='h5' sx={{ my: 1 }} id={id}>{name}</Typography>
			<Grid container spacing={3}>
				{entries.sort((a, b) => a.name.localeCompare(b.name)).map((entry, key) =>
					<Entry key={key} {...entry} />
				)}
			</Grid>
		</>
	)
}