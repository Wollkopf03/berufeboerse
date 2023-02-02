import { Container, Grid } from '@mui/material'
import axios from "axios"
import { useLoaderData, useParams } from "react-router-dom"
import { API_BASE_URL } from ".."
import { Category } from './components/Category'
import { EntryType } from './components/Entry'
import { LetterCard } from './components/LetterCard'
import { LetterTab } from './components/LetterTab'
import { SearchBar } from './components/SearchBar'


export const userLoader = async () => {
	const data: EntryType[] = await axios.get(API_BASE_URL + "load/")
		.then((response: { data: { category: string, name: string, information: string }[] }) =>
			response.data.map(entry => {
				const e: EntryType = { ...entry, ...JSON.parse(entry.information) }
				return e
			}))
		.catch(e => {
			console.error(e)
			return []
		})
	return data
}

export function User() {
	const { letter } = useParams()
	const entries = useLoaderData() as EntryType[]
	try {
		const categories = [...new Set(entries.map(entry => entry.category))].sort((a, b) => a.localeCompare(b)).filter(category => category[0].toUpperCase() === letter || letter === "_")
		const allCategories = [...new Set(entries.map(entry => entry.category))].sort((a, b) => a.localeCompare(b))
		const letters = [...new Set(entries.map(entry => entry.category.toUpperCase()[0]))].sort((a, b) => a.localeCompare(b))

		return (<>
			<LetterTab
				letters={[...new Set(entries.map(entry => entry.category[0].toUpperCase()))]}
				letter={letter!}
			/>
			<Container maxWidth="xl" sx={{ px: "4px" }}>
				{letter === "search" &&
					<SearchBar entries={entries} />}
				{letter === "home" &&
					<Grid container spacing={3} sx={{ my: 1 }}>
						{letters.map((letter, key) => <LetterCard key={key} letter={letter} categories={allCategories.filter(category => category.toUpperCase().startsWith(letter))} />)}
					</Grid>}
				{categories.map((category, key) => <Category key={key} name={category} entries={entries.filter(entry => entry.category === category)} />)}
			</Container>
		</>)
	} catch {
		return <></>
	}
}