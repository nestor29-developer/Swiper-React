import './styles.css';

export const Title = (props) => {
  const { name } = props;
  return name && <h2 className="App_title flex-center">{name}</h2>;
};
