import Form from "../components/Form";
import List from "../components/List";
function Home() {
  return (
    <div>
      <header>
        <h2>My Todo List</h2>
        <p>2023</p>
      </header>
      <Form />
      <List isDone={false} />
      <List isDone={true} />
    </div>
  );
}

export default Home;
