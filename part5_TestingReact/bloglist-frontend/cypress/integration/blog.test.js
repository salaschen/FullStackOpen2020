import { v4 as uuid } from "uuid";

describe("Blog app", function () {
    // clean up the test database first
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/test/reset");
        cy.visit("http://localhost:3000");
    });

    it("Login form is shown", function () {
        cy.contains("username"); // label
        cy.contains("password"); // label
        cy.get("#username"); // text input
        cy.get("#password"); // text input
    });

    describe.only("When logged in", function () {
        // create a new user and log in
        beforeEach(function () {
            const newUser = {
                name: "salas",
                username: "salaschen",
                password: "123456",
            };
            cy.request("POST", "http://localhost:3003/api/users/", newUser);

            // another user
            cy.request("POST", "http://localhost:3003/api/users/", {
                name: "dummy",
                username: "dummy",
                password: "123456",
            });

            cy.request("POST", "http://localhost:3003/api/login", {
                username: "salaschen",
                password: "123456",
            }).then((response) => {
                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(response.body)
                );
                // console.log(localStorage.getItem("loggedInUser")); // debug
                cy.visit('http://localhost:3000')
                cy.contains("salaschen logged in");
            });
        });

        // 5.19 test adding a new blog
        it("A blog can be created", function () {
            const title = `title: ${uuid()}`;
            const author = "salaschen";
            const url = "url";
            cy.contains("create new blog").click();

            cy.get("#title").type(title);
            cy.get("#author").type(author);
            cy.get("#url").type(url);
            cy.get("#submitButton").click();

            cy.contains(`${title} ${author}`);

            // 5.20* make sure the user can like a blog
            cy.contains("view").click();
            cy.contains("likes 0");
            cy.contains("like").click();
            cy.contains("likes 1");

            // 5.21 # the user created the blog can remove the blog
            cy.contains("remove").should('be.visible')

            cy.contains('logout').click()
            cy.get("#username").clear()
            cy.get("#username").type("dummy");
            cy.get("#password").type("123456");
            cy.contains("login").click();
            cy.contains("dummy logged in");

            cy.contains("view").click();
            cy.contains('remove').should('not.be.visible')
            cy.contains('logout').click()
        });

        afterEach(function () {
            window.localStorage.removeItem("loggedInUser");
        });
    });

    // 5.18
    describe("Login test", function () {
        // create new user using HTTP methods, bypassing UI.
        beforeEach(function () {
            const newUser = {
                name: "salas",
                username: "salaschen",
                password: "123456",
            };
            cy.request("POST", "http://localhost:3003/api/users/", newUser);
            cy.visit("http://localhost:3000");
        });

        it("Succeeds with correct credentials", function () {
            cy.get("#username").type("salaschen");
            cy.get("#password").type("123456");
            cy.contains("login").click();
            cy.contains("salaschen logged in");
            cy.contains("create new blog");
        });

        it("fails with wrong credentials", function () {
            cy.get("#username").type("salaschen");
            cy.get("#password").type("456");
            cy.contains("login").click();
            cy.contains("login unsuccessful.");
        });
    });
});
