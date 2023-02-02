import { Box, Container, createTheme, ThemeProvider, Typography } from '@mui/material';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Admin } from './admin/Admin';
import Login from './login/Login';
import { User, userLoader } from './user/User';

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 0,
			md: 700,
			lg: 1000,
			xl: 1300
		}
	},
	palette: {
		primary: {
			main: "#A2DD00"
		},
		secondary: {
			main: "#77A300"
		},
	},
	components: {
		MuiToggleButtonGroup: {
			styleOverrides: {
				root: {
					backgroundColor: "#A2DD00",
					color: "#ffffff",
					borderRadius: 0,
					border: 0,
					flexWrap: "wrap"
				},
			}
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					":hover": {
						backgroundColor: "#77A300",
					},
					flexBasis: "min-content",
					backgroundColor: "#A2DD00",
					color: "#ffffff",
					borderRadius: 0,
					border: 0,
					margin: "auto"
				}
			}
		}
	},
})

export function App() {
	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth="xl" sx={{ mb: 8, fontFamily: ["sans-serif"] }}>
				<Box sx={{ my: { xs: 3, md: 6 }, pt: "5px", borderRadius: "10px", backgroundColor: "#ffffff" }}>
					<a href="https://cms.mcs-rbg.de/">
						<img
							id="main-feat-img"
							width="100%"
							src="https://cms.mcs-rbg.de/wp-content/uploads/2022/01/cropped-Logo-MCS-und-KGSNetz.png"
							alt="Marie Curie Schule" />
					</a>
					<RouterProvider router={createBrowserRouter([
						{ path: "/", element: <Navigate to="/home" /> },
						{ path: "/login", element: <Login /> },
						{ path: "/admin", element: <Admin /> },
						{ path: "/:letter", loader: userLoader, element: <User /> }
					])} />
					<Box sx={{
						display: 'flex',
						position: "relative",
						backgroundColor: "#77A300",
						mt: 3,
						borderBottomLeftRadius: "5px",
						borderBottomRightRadius: "5px"
					}}>
						<Typography sx={{
							position: 'relative',
							left: 5,
						}} variant="h6" color="rgba(0, 0, 0, 0.5)">
							by {`${process.env.REACT_APP_AUTHOR}`}
						</Typography>
						<Typography sx={{
							position: 'absolute',
							right: 5,
						}} variant="h6" color="rgba(0, 0, 0, 0.5)">
							v{`${process.env.REACT_APP_VERSION}`}
						</Typography>
					</Box>
				</Box>
			</Container>
		</ThemeProvider >
	)
}