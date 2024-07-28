# Understanding Idempotency

I had a previous understanding of the concept of Idempotency and why it can be an asset when implementing APIs. However, I had never implemented an idempotent API before, completely or partially. With this small and simple proof of concept, I hope to bring clarity to myself and possibly to others about the this topic.

## What is 'Idempotency'?

'Idempotency' comes from 'idempotent', which is a potential quality of some API requests. A request is idempotent if executing it multiple times does not cause changes in the server's state (i.e. your database) more than once. Basically, calling the same endpoint multiple times with the same HTTP method and request body should incur mutations to your data **at most once**.

From what I gather, an API can be completely idempotent or partially. That is because some HTTP methods are idempotent by default. For example, if you execute many GET requests, they will not cause any change to your database by themselves. The DELETE method is also automatically idempotent, since you can only delete any entry once and a subsequent duplicate request would trigger an error or an also repeated success message.

## Why should we care about it?

Not everyone needs to worry about their API being idempotent or not. That being said, there are certainly use cases that warrant its implementation. The most common one (which I believe maybe have been popularized by [Stripe](https://stripe.com/blog/idempotency)) is handling payments. You obviously only want to trigger any sort of payment once so that your user doesn't pay twice for the same service or product. The challenge is making sure you can identify when repeated payment is happening on purpose or not.

There are various reasons why one can want to use this type of implementation. Networks are not 100% reliable, users might click the same button twice or thrice in a row because some animation was not properly responsive.

Here are two articles that I think cover the this whole conversation nicely:
[Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency) - by Brandur Leach
[Idempotency - What it is and How to Implement it](https://www.alexhyett.com/idempotency/#what-is-idempotency) - by Alex Hyett

(...will write the rest soon, going over my own implementation here and more concepts)