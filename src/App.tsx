import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import Router from "./shard/Router";
import GlobalStyle from "./style/GlobalStyle";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <GlobalStyle />
        <Router />
      </div>
    </QueryClientProvider>
  );
}

export default App;
