import { visit } from "unist-util-visit";

export default function rehypeBleedImages() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "img") return;
      const props = node.properties || {};
      const title = props.title;

      // Check for opt-out pattern in title attribute
      if (title && /\bnot\s+bleed\b/i.test(String(title))) {
        delete props.title;
        return;
      }

      // Remove title attribute
      delete props.title;

      // Preserve existing classes and add bleed-specific classes
      const cls = Array.isArray(props.class)
        ? props.class
        : typeof props.class === "string"
        ? props.class.split(/\s+/).filter(Boolean)
        : [];

      props.class = [
        ...cls,
        "w-screen",
        "max-h-screen",
        "h-auto",
        "object-contain",
        "block",
      ].join(" ");

      // Wrap image in full-width container
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: {
          class: "not-prose my-6 relative left-1/2 -translate-x-1/2 w-screen",
        },
        children: [node],
      };
    });
  };
}
