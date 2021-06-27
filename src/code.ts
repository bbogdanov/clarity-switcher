import { InputNameValue } from "./utils/InputNameValue.interface";
import { MessageTypes } from "./utils/messageTypes.enum";
import { PostMessage } from "./utils/postMessage.interface";
import { PostMessageTypes } from "./utils/postMessages.type";

const getAllComponentsInCurrentPage = () => {
  return figma.currentPage.findAll((n: any) => {
    const proto = n["__proto__"];
    if (proto) {
      return proto.constructor.name === "ComponentNode";
    }

    return false;
  });
};

figma.showUI(__html__, {
  height: 400,
  width: 400,
});

figma.ui.onmessage = ({ type, data }: PostMessage<PostMessageTypes>) => {
  if (type === MessageTypes.ChangePropValue) {
    const components = getAllComponentsInCurrentPage();

    components.forEach((component: ComponentNode) => {
      console.log(component, data);
      // TODO: search for each component if it has variants of the `data.name` and set their value to `data.value`
    });

    return;
  }

  figma.closePlugin();
};

console.log(figma);
