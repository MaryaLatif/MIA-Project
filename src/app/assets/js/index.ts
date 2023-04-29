import {App} from "./components/App";

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}
const app = new App();
app.render(rootElement);