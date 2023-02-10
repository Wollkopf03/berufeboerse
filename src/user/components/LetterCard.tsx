import { Grid, Link, Paper } from "@mui/material"

export type CardType = {
	letter: string,
	categories: { name: string, id: string }[],
}

export const LetterCard = ({ letter, categories }: CardType) =>
	<Grid item xl={3} lg={4} md={6} sm={12}>
		<Paper variant="outlined" sx={{ p: 2, wordBreak: "break-word" }}>
			<strong>{letter}</strong><br />
			{categories.map((category, key) => <p key={key}>
				<Link href={"/" + letter + "/" + category.id}>
					{category.name}
				</Link>
			</p>)}
		</Paper>
	</Grid>