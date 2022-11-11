import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Admin from "./pages/AdminHomePage";
import AllUsers from "./pages/AllUsers";
import Authentication from "./pages/Authentication";
import IndividualUser from "./pages/IndividualUser";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import SharedLayout from "./pages/SharedLayout";
import User from "./pages/UserHomePage";
import UserTreeData from "./pages/UserTreeData";

const theme = createTheme({
    palette: {
        primary: {
            main: "#116530",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <SharedLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<User />} />
                        <Route path='tree-data' element={<UserTreeData />} />
                    </Route>
                    <Route
                        path='/admin'
                        element={
                            <ProtectedRoute admin>
                                <SharedLayout admin />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Admin />} />
                        <Route exact path='users' element={<AllUsers />} />
                        <Route
                            path='users/:userId'
                            element={<IndividualUser />}
                        />
                    </Route>
                    <Route exact path='/auth' element={<Authentication />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
