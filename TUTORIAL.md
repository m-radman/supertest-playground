# Part 2: API Testing with SuperTest

**Before we get started**

- [ ]  `step0` Make sure you have Git as well as NodeJS (`npm` comes with it) installed on your system
    
    ![Screenshot 2023-01-04 at 18.08.28.png](assets/img/Screenshot_2023-01-04_at_18.08.28.png)
    
    *If you don’t have NodeJS installed don’t panic, just go to [https://nodejs.org/en/](https://nodejs.org/en/) to download and install LTS version of NodeJS on your system.* 
    
- [ ]  `step1` Clone GitHub repo [https://github.com/ivaaaa/supertest-playground](https://github.com/ivaaaa/supertest-playground), this is going to be our code repository for `Part 2`
    
    ```bash
    git clone git@github.com:ivaaaa/supertest-playground.git
    cd supertest-playground 
    npm install
    ```
    
- [ ]  `step2` Make sure you have access to [Simple Books API](https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md)  endpoints from Postman
- [ ]  `step3` Check out `supertest`’s  [README.md](https://github.com/ladjs/supertest#readme)
    
    👉 **Why** **we need** SuperTest? **Which problem it solves** for us? 
    
    → It will provide us with **high-level abstraction** **for testing HTTP** 
    
    `note#1` “testing HTTP” just means testing APIs, tests that send HTTP request and expect HTTP response in return
    
    `note#2` ”high-level abstraction” means this 👇
    
    Our tests **don’t** **need** to **know `how` to** send an HTTP request (although they do need it sent). By deciding to use SuperTest we are deciding that we are going to delegate the responsibility of sending requests over HTTP to `supertest`. Or, in other words, **we will use `supertest` to send HTTP requests** over network for us.
    
    👉 **What** is SuperTest **based on**? → “HTTP assertions made easy via **SuperAgent**”  (*SuperAgent - Small progressive **client-side HTTP request library**)
    
    `[supertest` on npm](https://www.npmjs.com/package/supertest) & `[superagent` on npm](https://www.npmjs.com/package/superagent)  documentation available [here](https://ladjs.github.io/superagent/) 
    
- [ ]  `step4` 🎉 you are all set!

### API Testing with SuperTest

<aside>
🎯 Our goal

- learn **how to design, write and run API tests** **using SuperTest** library
</aside>

<aside>
💡 Get to know the thing under test 👀

Before we get into writing tests, let’s first analyse the functionality of our “application under test”. 

In other words, we want to look into the [API documentation](https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md) that describes **`which endpoints of Simple Books are exposed and how to use them`** 

We should: 

- get familiar with all of the endpoints (8 endpoints + 1 endpoint we need for authentication purposes)
- detect the resources which Simple Books service is responsible of (we have 2 resources - `book` and `order` )
- think about which [status codes](https://www.w3.org/Protocols/HTTP/HTRESP.html) could be returned by each of the endpoints
    - 400 Bad Request - valid / failure response for POST / PUT request (when `body` you sent in HTTP request is not what web service code expects)
    - 200 OK - valid / success response for GET request
    - 201 OK - valid / success response for POST / PUT request
    - 404 Not Found - resource not found, valid GET response if the requested resource does not exist (example: there is no book with given bookId)
    - 500 Internal Server Error - an error occurred but web service code did not count on that type of error - this is not smth that you would ever expect to happen
    

[📚 Simple Books API](https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md) implements following endpoints

---

GET `/status`  grab status of the web service 

---

GET `/books`  list books 

GET `/books/:bookId` get book details by it’s id 

---

POST `/orders`  create new order record `requires authentication`

GET `/orders`  get all orders `requires authentication`

GET `/orders/:orderId` get order by it’s id  `requires authentication`

PATCH `/orders/:orderId` update existing order  `requires authentication`

DELETE `/orders/:orderId` delete order with given id  `requires authentication`

---

POST `/api-clients/` register your API client so that you can authenticate yourself

</aside>

<aside>
✍️ ****Exercises**** **`TODO`:**

</aside>

<aside>
✋ C**onceptual Asides`TODO`** ✍️

- 
- `CA-M`  let’s demystify 🔎 why we need APIs? → what is RPC (RPC stands for Remote Procedure Call, procedure = function) ? 👉let’s jump to a quick lesson by `Valentin Despa` 🧑‍🏫 [here](https://www.youtube.com/watch?v=MdaGuP6-bKs)

 

*Udemy account* → `ivacizmas@gmail.com` / `UcimoProgramiranje2022`  

</aside>

### Links & Readings