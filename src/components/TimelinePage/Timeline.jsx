import { useState } from "react";
import { publishPost } from "../../services/LinkrAPI";
import { PublishForm } from "../PublishForm/PublishForm";
import { Wrapper } from "./TimelineContainer";

const Timeline = () => {
  const [status, setStatus] = useState("idle");
  const formHandler = (e) => {
    e.preventDefault();
    const { url, content } = e.target.elements;
    setStatus("loading");
    // Token hardcoded
    publishPost({ url: url.value, content: content.value }, 25).then(
      () => {
        setStatus("sucess");
        url.value = null;
        content.value = null;
      },
      (error) => {
        setStatus("error");
        console.log(error);
      }
    );
    console.log({ url: url.value, content: content.value });
  };

  return (
    <Wrapper>
      <header>timeline</header>
      <PublishForm status={status} handleForm={formHandler} />
    </Wrapper>
  );
};

export { Timeline };
