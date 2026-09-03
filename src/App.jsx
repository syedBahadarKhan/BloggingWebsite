import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Routes/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}