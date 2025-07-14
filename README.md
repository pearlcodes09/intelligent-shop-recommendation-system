Intelligent Shop & Product Recommendation Assistant

This project is a Generative AI tool that recommends shops, products, and smart upsell combos based on user queries. It uses LLM-powered prompt logic with static datasets and a working backend powered by Groq's `llama3-70b` model.

FEATURES OF THIS PROJECT
1. Recommends shops based on user location, needs, or product category
2. Suggests products with matching upsells
3. Uses Groq API (LLM) for natural, prompt-based responses
4. All responses are generated dynamically using LLM + dataset context
5. Simple HTML frontend with minimal coding

files and description:
server.js             Main backend logic
shops.json            dataset of shops
products.json         dataset of products
package.json          Node project config
package-lock.json     Dependency lock file
index.html            simple frontend UI
README.md             This documentation
