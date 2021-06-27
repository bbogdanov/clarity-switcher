import "./ui.css";
import "@cds/core/button/register";
import "@cds/core/input/register.js";
import { MessageTypes } from "./utils/messageTypes.enum";

const setup = () => {
  const form = document.getElementById("change-prop-value") as HTMLFormElement;
  form.onsubmit = (event: Event) => {
    event.preventDefault();
    const data = new FormData(form);

    const request = {};

    data.forEach(function (value, key) {
      request[key] = value;
    });

    parent.postMessage(
      {
        pluginMessage: {
          type: MessageTypes.ChangePropValue,
          prop: request,
        },
      },
      "*"
    );
  };

  document.getElementById("cancel").onclick = () => {
    parent.postMessage({ pluginMessage: { type: MessageTypes.Cancel } }, "*");
  };
};

setup();
