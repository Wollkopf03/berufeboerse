import { Grid, Typography } from '@mui/material'
import { Entry, EntryType } from './Entry'

type Props = {
	name: string,
	entries: EntryType[]
}

export function Category({ name, entries }: Props) {
	return (
		<>
			<Typography variant='h5' sx={{ my: 1 }}>{name}</Typography>
			<Grid container spacing={3}>
				{entries.sort((a, b) => a.name.localeCompare(b.name)).map((entry, key) => {
					return <Entry key={key} {...entry} />
				})}
			</Grid>
		</>
	)
}