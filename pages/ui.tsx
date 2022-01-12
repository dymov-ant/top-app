import { Button, Title, Text, Tag } from "../components/UI";

export default function Ui() {
  return (
    <div className="ui-page">
      <Title tag="h1">Основные UI элементы</Title>
      <div style={{border: "1px solid teal", padding: "25px", marginBottom: "25px"}}>
        <Title tag="h2">Типографика</Title>
        <hr/>
        <Title tag="h3">Заголовки</Title>
        <Title tag="h1">H1</Title>
        <Title tag="h2">H2</Title>
        <Title tag="h3">H3</Title>
        <br/>
        <Title tag="h3">Текст</Title>
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis impedit ipsam molestiae, nisi officia placeat repellendus sed sequi unde. Asperiores corporis culpa cum deserunt ducimus earum nesciunt quia repudiandae, voluptates.</Text>
      </div>

      <div style={{border: "1px solid teal", padding: "25px", marginBottom: "25px"}}>
        <Title tag="h2">Кнопки</Title>
        <hr/>
        <Button variant="primary" style={{marginRight: "25px"}}>Primary</Button>
        <Button variant="primary" arrow="down" style={{marginRight: "25px"}}>Primary arrow down</Button>
        <Button variant="primary" arrow="right" style={{marginRight: "25px"}}>Primary arrow right</Button>
        <Button variant="ghost" style={{marginRight: "25px"}}>Ghost</Button>
        <Button variant="ghost" arrow="down" style={{marginRight: "25px"}}>Ghost arrow down</Button>
        <Button variant="ghost" arrow="right">Ghost arrow right</Button>
      </div>

      <div style={{border: "1px solid teal", padding: "25px"}}>
        <Title tag="h2">Тэги</Title>
        <hr/>

        <Title tag="h3">small</Title>
        <Tag size="small">small</Tag>
        <Tag size="small" color="primary">small primary</Tag>
        <Tag size="small" color="red">small red</Tag>
        <Tag size="small" color="gray">small gray</Tag>
        <Tag size="small" color="green">small green</Tag>

        <br/><br/>

        <Title tag="h3">middle</Title>
        <Tag>middle</Tag>
        <Tag color="primary">middle primary</Tag>
        <Tag color="red">middle red</Tag>
        <Tag color="gray">middle gray</Tag>
        <Tag color="green">middle green</Tag>
      </div>
    </div>
  );
}
