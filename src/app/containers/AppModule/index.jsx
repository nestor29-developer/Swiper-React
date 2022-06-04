import { Title } from "../../commons/components/title/index";
import { CardIcons } from "../../commons/components/card-icons/index";
import { CardImages } from "../../commons/components/card-images/index";
import { useEffect, useState } from "react";

export const AppModule = () => {
  const title = "MASTER WiZR Modules";
  const [data, setData] = useState([]);
  const [image, setImage] = useState({});
  const [indexActive, setIndexActive] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      const url = "https://jsonplaceholder.typicode.com/photos";
      let response = await fetch(url);
      response = await response.json();
      if (response) {
        response = response.slice(32, 38);
        setData(response);
      }
    }

    fetchPhotos();
  }, []);

  return (
    <>
      <Title name={title} />
      <CardIcons data={data} setImage={setImage} indexActive={indexActive} />
      <CardImages
        data={data}
        imageSelected={image}
        setIndexActive={setIndexActive}
      />
    </>
  );
};
