import { React, useState, useMemo, useEffect } from "react";
import "./styles.css";

export const CardIcons = (props) => {
  const { data, setImage, indexActive } = props;
  const [color, setColor] = useState({});

  const clickImage = (item, index) => {
    setImage({
      item: item,
      index: index,
    });
    setColor({
      status: true,
      id: index,
    });
  };

  useEffect(() => {
    if (indexActive) {
      setColor({
        status: false,
        id: 0,
      });
    }
  }, [indexActive]);

  console.log("indexActive: ", indexActive);

  return useMemo(
    () => {
      return (
        <div className="row flex-center section-icons">
          {data &&
            data.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className="column">
                    <div
                      id={index}
                      className={`card pointer ${
                        (color.status && color.id === index) ||
                        index === indexActive
                          ? "card--click"
                          : ""
                      }`}
                      onClick={() => clickImage(item, index)}
                    >
                      <img
                        width="32"
                        src={item.thumbnailUrl}
                        alt={item.title}
                      />
                    </div>
                    <p className="">{item.title.split(" ")[0]} </p>
                  </div>
                </div>
              );
            })}
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, indexActive, color]
  );
};
