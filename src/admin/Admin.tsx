import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '..'
import { getToken } from '../hooks/useAuth'


export function Admin() {
	const [name, setName] = useState("")
	const [category, setCategory] = useState("")
	const [information, setInformation] = useState("")
	const [categories, setCategories] = useState<string[]>([])

	if (!getToken() && window.location.pathname !== "/login") {
		window.location.replace("/login")
		return <></>
	}

	const getCategories = async () => {
		const data: string[] = await axios.get(API_BASE_URL + "getCategories/")
			.then(response => response.data.categories.map((category: { name: string }) => category.name))
			.catch(error => { console.log(error); return []; });
		if (JSON.stringify(categories) !== JSON.stringify(data)) {
			setCategories(data)
		}
	}
	getCategories()

	const checkForm = () => {
		if (name === "")
			return
		if (category === "")
			return
		if (information === "")
			return
		// addEntry() TODO
		setName("")
		setCategory("")
		setInformation("")
	}
	return (
		<Grid container spacing={3} sx={{ px: "40px", pt: "40px" }}>
			<Grid item xs={12} sm={12}>
				<TextField
					required
					label="Name"
					fullWidth
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
			</Grid>
			<Grid item xs={12} sm={12}>
				<FormControl fullWidth>
					<InputLabel id="category-label" required>Category</InputLabel>
					<Select
						required
						labelId="category-label"
						id="category"
						value={category}
						label="Category"
						onChange={e => setCategory(e.target.value)}
					>
						<MenuItem value="">---NONE---</MenuItem>
						{categories.length > 0 && categories.map((category, key) => <MenuItem key={key} value={category}>{"" + category}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} sm={12}>
				<TextField
					multiline
					minRows={4}
					required
					label="Information"
					fullWidth
					onChange={(e) => setInformation(e.target.value)}
					value={information}
				/>
			</Grid>
			<Grid item xs={12} sm={12}>
				<Button
					variant='contained'
					onClick={checkForm}
				>Absenden</Button>
			</Grid>
		</Grid >
	)
}
