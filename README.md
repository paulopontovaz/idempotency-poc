# Idempotency PoC

I had a previous understanding of the concept of Idempotency and why it can be an asset when implementing APIs. However, I had never implemented an idempotent API before, completely or partially. With this small proof of concept, I hope to bring clarity to myself and possibly to others about the this topic.

## How to run the app?

### Pre-requisities

- Overall: `Docker`
- Only for running locally: `Node` and `Bun`

### Instructions

* Rename both `.env.example` files to `.env`.

* Running the code with Docker

    1. Open a terminal at the root directory and run

            ./go setup_and_run_docker

    2. Open the URL `localhost:8080` in the browser of your choice

* Running the code locally

    1. Open a terminal at the root directory and run

            ./go setup_local

    2. Open the URL `localhost:3000` in the browser of your choice

Note: keep in mind that you might have to adjust ports and hosts (Redis and Postgres) depending on how you you decide to run the app.

## Talking about the topic

### What is 'Idempotency'?

'Idempotency' comes from 'idempotent', which is a potential quality of some API requests. A request is idempotent if executing it multiple times only causes changes in the server's state (i.e. your database) **at most once**.

From what I gather, an API can be completely idempotent or partially. That is because some HTTP methods are idempotent by default. For example, if you execute many GET requests, they will not cause any change to your database by themselves.

The DELETE method is also automatically idempotent, since you can only delete any entry once and a subsequent duplicate request would trigger an error or an also repeated success message. In this case we can say the endpoint is "idempotent but not safe".

POST is the most common use case for implementing idempotency, since it's supposed to be used to create a row or perform some change in your server's state.

PUT and PATCH can be idempotent or not. Depending on how their route handlers are implemented.

### Why should we care about it?

Not everyone needs to worry about their API being idempotent or not. That being said, there are certainly use cases that warrant its implementation. The most common one (which I believe maybe have been popularized by [Stripe](https://stripe.com/blog/idempotency)) is handling payments.

You obviously only want to trigger any sort of payment once so that your user doesn't pay twice for the same service or product. The challenge is making sure you can identify when repeated payment is happening on purpose or not.

There are various reasons why one would want to use this sort of implementation. Networks are not 100% reliable, users might click the same button twice or thrice in a row because some animation was not properly responsive or something like that.

Here are two articles that I think cover the this whole conversation nicely:
- [Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency) - by Brandur Leach

- [Idempotency - What it is and How to Implement it](https://www.alexhyett.com/idempotency/#what-is-idempotency) - by Alex Hyett

### What I'm trying to cover with this proof of concept

I tried to simulate executing multiple identical requests to the API at the same time. This is achieved by adding a `setTimeout` call when the user clicks on "Complete Purchase" in the modal where the purchases can be created (POST HTTP method). This will add a window of time before the modal is closed and the submit button will remain clickable.

The `Idempotency-Key` header's value is defined by the request body and a random uuid generated for every instance of the modal that is opened. If you click "Complete Purchase" multiple times in a row, you should be able to simulate duplicate requests.

Thanks to `[cacheMiddleware](./server//api/middlewares/cacheMiddleware.ts)`, the route handler for the POST method should only be called once and, hence, side-effects from these requests should also only happen once.

Now, note that I'm setting cache entries to expire in 10 seconds:

        await redisClient.SET(cacheKey, response, { EX: 10 });

This is only for demonstration purposes. Usually, you would want to set the cache entries' "Time To Live" to around 48 hours.

## Final Thoughts

Whoever read everything until here, I appreciate your time and would love to have some feedback, if you would be so kind. Maybe there's something I can improve in this README and/or in the code. Cheers!