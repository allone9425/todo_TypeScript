import styled from "styled-components";
import Form from "../components/Form";
import List from "../components/List";
function Home() {
  return (
    <HomeBox>
      <Header>
        <h2>나의 할일 목록</h2>
        <p>2023</p>
      </Header>
      <Form />
      <List isDone={false} />
      <List isDone={true} />
    </HomeBox>
  );
}

export default Home;
const HomeBox = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
  font-size: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #d4dbe9;
  font-weight: 700;
`;
