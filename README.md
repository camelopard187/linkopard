# What if 🤔

When considering the possibility of scaling a URL shortener service to handle a high volume of requests, it's crucial to approach the challenge from a system architecture perspective. One effective way to improve your service's performance is to restructure the codebase to **incorporate Redis caching**, which will reduce the number of database requests required to create and resolve URLs.

1. Scaling can be done vertically or horizontally. Vertical scaling **increases the memory and CPU** of existing instances while horizontal scaling **adds more instances**. Kubernetes can help manage containerized instances. **Load balancers** distribute traffic and **auto-scaling** adds or removes instances for optimal performance.

   > [!NOTE]
   > Due to its asynchronous nature Node.js is an excellent tool for achieving horizontal scaling.

2. **Using a distributed database service across multiple regions and deployment platforms** like PlanetScale can ensure uninterrupted access to data, scalability, and high availability. The amount of time data is kept will depend on the specific use case and data retention policies.

   > [!NOTE]
   > Managing your database can be simplified by external service providers, but it comes with additional costs as demand increases.

3. Lastly, a serverless computing platform, such as Vercel Edge Functions, can **optimize service performance by minimizing request latency** and enhancing the overall user experience.

   > [!IMPORTANT]
   > This process can be considerably slower if the edge function is far away from the database.
