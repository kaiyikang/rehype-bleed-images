import { rehype } from "rehype";
import rehypeBleedImages from "../src/index.js";

const processor = rehype().use(rehypeBleedImages);

// Simple test
const input = '<img src="test.jpg" alt="Test" />';
const result = await processor.process(input);

console.log("✅ Plugin loaded and executed successfully");
console.log("Input:", input);
console.log("Output:", String(result));
