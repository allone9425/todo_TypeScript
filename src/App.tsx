// App.tsx
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Router from "./shard/Router";
import GlobalStyle from "./style/GlobalStyle";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <GlobalStyle />
        <Router />
      </div>
    </QueryClientProvider>
  );
}

export default App;
