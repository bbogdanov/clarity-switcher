import { InputNameValue } from "./utils/InputNameValue.interface";
import { MessageTypes } from "./utils/messageTypes.enum";
import { PostMessage } from "./utils/postMessage.interface";
import { PostMessageTypes } from "./utils/postMessages.type";

const getAllComponentsInCurrentPage = (figma: {
  currentPage: PageNode;
}): InstanceNode[] => {
  return figma.currentPage.findAll(
    (n: { type: NodeType }) => n.type === "INSTANCE"
  ) as InstanceNode[];
};

figma.showUI(__html__, {
  height: 400,
  width: 400,
});

figma.ui.onmessage = ({ type, data }: PostMessage<PostMessageTypes>) => {
  const instanceNodes: InstanceNode[] = getAllComponentsInCurrentPage(figma);
  console.log("instanceNodes", instanceNodes);

  if (instanceNodes.length) {
    const componentSets: ComponentSetNode[] = instanceNodes
      .filter((x) => x?.mainComponent?.parent?.type === "COMPONENT_SET")
      .map((x) => x?.mainComponent?.parent) as ComponentSetNode[];

    console.log(
      componentSets[0].children
        .filter((x) => x.name.includes("Success"))
        .map((x) => x.name.split(",").find((x) => x.includes("Success")))
    );

    const darkModeComponent = componentSets[0].children.find((x) =>
      x.name.includes("Success")
    );
    instanceNodes[0].swapComponent(darkModeComponent as ComponentNode);
  }

  // if (type === MessageTypes.ChangePropValue) {
  //   const components = getAllComponentsInCurrentPage();

  //   const searchName = data.name + "=" + data.value;

  //   const foundComponent = components.find((c) => c.name.includes(searchName));

  //   console.log(foundComponent);

  //   const a = foundComponent.createInstance();

  //   console.log(a);

  //   components.forEach((component: ComponentNode) => {
  //     if (component.name.includes(data.name)) {
  //       const split = component.name.split(",");
  //       const findName = split.find((x) => x.includes(data.name));
  //     }
  //   });

  //   return;
  // }

  // figma.closePlugin();
};
