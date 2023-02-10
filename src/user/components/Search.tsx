import { Grid, Link, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { Entry, EntryType } from './Entry';

type Props = {
	entries: EntryType[],
	categories: { name: string, id: string }[]
}

export function Search({ entries, categories }: Props) {

	const [searchString, setSearchString] = useState("")

	return (
		<Grid container spacing={3}>
			<Grid item xs={4} sx={{ p: 1 }}>
				<TextField
					fullWidth
					label="Betriebe"
					value={searchString}
					onChange={(e) => setSearchString(e.target.value)}
				/>
			</Grid>
			<Grid item xs={8}>
			</Grid>
			<Grid item xs={12}>
				<Paper variant="outlined" sx={{ p: 2, wordBreak: "break-word" }}>
					<Grid container spacing={3}>
						{categories
							.filter((category) => category.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
							.map((category, key) =>
								<Grid key={key} item xs={3}>
									<Link href={"/" + category.name[0].toUpperCase() + "/" + category.id}>
										{category.name}
									</Link>
								</Grid>)}
					</Grid>
				</Paper>
			</Grid>
			{entries
				.filter((entry) => entry.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
				.map((entry, key) => <Entry key={key} {...entry} />)}
		</Grid>
	)
}