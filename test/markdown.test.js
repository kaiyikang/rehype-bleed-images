import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeBleedImages from "../src/index.js";
import rehypeStringify from "rehype-stringify";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeBleedImages)
  .use(rehypeStringify);

async function simpleTest() {
  console.log("🧪 Simple Markdown Image Test\n");

  const markdown = `# My Blog Post

Here's a beautiful landscape photo:

![Beautiful landscape](landscape.jpg)

And here's a small icon that shouldn't bleed:

![Icon](icon.png "Small icon not bleed")`;

  try {
    const result = await processor.process(markdown);
    const html = String(result);

    console.log("📝 Input Markdown:");
    console.log(markdown);
    console.log("\n🎯 Output HTML:");
    console.log(html);

    // Basic checks
    const hasBleedDiv = html.includes("not-prose my-6 relative left-1/2");
    const hasBleedImg = html.includes(
      "w-screen max-h-screen h-auto object-contain block"
    );

    console.log("\n✅ Results:");
    console.log("- Bleed container created:", hasBleedDiv ? "✅" : "❌");
    console.log("- Image classes applied:", hasBleedImg ? "✅" : "❌");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

simpleTest();
