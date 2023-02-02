import { Grid, Paper, Typography } from "@mui/material"

export type CardType = {
	letter: string,
	categories: string[],
}

export const LetterCard = (entry: CardType) =>
	<Grid item xl={3} lg={4} md={6} sm={12}>
		<Paper variant="outlined" sx={{ p: 2, wordBreak: "break-word" }}>
			<strong>{entry.letter}</strong><br />
			{entry.categories.map((category, key) =>
				<Typography variant='body1' key={key}>
					{category}
				</Typography>)}
		</Paper>
	</Grid>