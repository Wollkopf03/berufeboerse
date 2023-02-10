import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import axios from "axios"
import { useEffect, useState } from 'react'
import { useLoaderData, useParams } from "react-router-dom"
import { API_BASE_URL } from ".."
import { Category } from './components/Category'
import { EntryType } from './components/Entry'
import { LetterCard } from './components/LetterCard'
import { LetterTab } from './components/LetterTab'
import { Search } from './components/Search'


export const userLoader = async () => {
	const data: EntryType[] = await axios.get(API_BASE_URL + "load/")
		.then((response: { data: { category: string, name: string, information: string }[] }) =>
			response.data.map(entry => {
				return { ...entry, ...JSON.parse(entry.information) } as EntryType
			}))
		.catch(e => {
			console.error(e)
			return []
		})
	return data
}

const style = { mb: 3, textAlign: 'justify' }

export function User() {
	const { letter, category } = useParams()
	const [visible, setVisible] = useState(sessionStorage.getItem("visible") !== "false")
	const entries = useLoaderData() as EntryType[]
	let id = 0
	const allCategories = [...new Set(entries.map(entry => entry.category))].sort((a, b) => a.localeCompare(b)).map(category => { return { name: category, id: String(id++) } })
	const categories = allCategories.filter(category => category.name[0].toUpperCase() === letter || letter === "_")
	const letters = [...new Set(entries.map(entry => entry.category.toUpperCase()[0]))].sort((a, b) => a.localeCompare(b))

	useEffect(() => {
		if (category)
			document.getElementById(category)?.scrollIntoView();
	}, [category])

	const close = () => {
		setVisible(false)
		sessionStorage.setItem("visible", "false")
	}

	return (<>
		<Dialog onClose={close} open={visible}>
			<DialogTitle>
				Vorwort
			</DialogTitle>
			<DialogContent dividers>
				<Typography sx={style}>
					Liebe Schülerinnen und Schüler der MCS,
				</Typography>
				<Typography sx={style}>
					alle reden vom Fachkräftemangel, aber wie können wir dem schnell und effektiv entgegenwirken? Eine fundierte Ausbildung gehört sicher noch immer zu der wichtigsten Grundlage zur Fachkräftesicherung, sie erweitert aber auch den eigenen Horizont und ist der Grundstein für eine sichere berufliche Zukunft. Das Angebot an Ausbildungsberufen ist dabei breit gefächert und es ist garantiert für Jede und Jeden etwas entsprechend der persönlichen Vorstellungen dabei.
				</Typography>
				<Typography sx={style}>
					Ich freue mich, dass Euch an der Marie-Curie-Schule mit der „BetriebeBörse“ ein Portal zur Verfügung steht, wo ihr unkompliziert und schnell herausfinden könnt, welch tolle Berufe es in der beruflichen Bildung auch hier vor Ort gibt.
				</Typography>
				<Typography sx={style}>
					Ich wünsche viel Spaß beim Durchstöbern der Angebote und wünsche Euch viel Erfolg bei der Suche nach einem Ausbildungsplatz!
				</Typography>
				<Box sx={{ display: { sm: "flex", xs: "box" } }}>
					<Box sx={{ width: { sm: "50%", xs: "100%" } }}>
						<Typography sx={style}>
							Euer
						</Typography>
						<Typography sx={style}>
							Marlo Kratzke
						</Typography>
						<Typography sx={style}>
							Bürgermeister
						</Typography>
					</Box>
					<Box sx={{ width: { sm: "50%", xs: "100%" } }}>
						<img alt="Marlo Kratzke" src="http://cms.mcs-rbg.de/wp-content/uploads/2023/01/Foto-Kratzke-300x200.jpg" style={{ width: "100%" }} />
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={close}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
		<LetterTab
			letters={[...new Set(entries.map(entry => entry.category[0].toUpperCase()))]}
			letter={letter!}
		/>
		<Container maxWidth="xl" sx={{ px: "4px", mt: 2 }}>
			{letter === "search" &&
				<Search entries={entries} categories={allCategories} />}
			{letter === "home" &&
				<Button variant="outlined" onClick={() => setVisible(true)}>
					Vorwort
				</Button> &&
				<Grid container spacing={3} sx={{ my: 1 }}>
					{letters.map((letter, key) => <LetterCard key={key} letter={letter} categories={allCategories.filter(category => category.name.toUpperCase().startsWith(letter))} />)}
				</Grid>}
			{categories.map((category, key) => <Category key={key} {...category} entries={entries.filter(entry => entry.category === category.name)} />)}
		</Container>
	</>)
}