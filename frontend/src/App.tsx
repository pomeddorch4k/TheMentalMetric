import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

const App: React.FC = () => {
	return (
		<BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
	)
}

export default App;
