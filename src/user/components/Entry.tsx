import { Grid, Paper, Typography } from '@mui/material'

export type EntryType = {
	category: string,
	name: string,
	information: string[]
}

export const Entry = (entry: EntryType) =>
	<Grid item xl={3} lg={4} md={6} sm={12}>
		<Paper variant="outlined" sx={{ p: 2, wordBreak: "break-word" }}>
			<strong>{entry.name}</strong><br />
			{entry.information.map((information, key) =>
				<Typography variant='body1' key={key}>
					{information.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ?
						<a href={"mailto:" + information}>{information}</a>
						: information.toLowerCase().match(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/) ?
							<a href={information.startsWith("https://") || information.startsWith("http://") ? information : "https://" + information}>{information}</a>
							: information}
					<br />
				</Typography>)}
		</Paper>
	</Grid>