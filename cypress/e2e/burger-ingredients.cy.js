describe("burger constructor tests", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
            fixture: "ingredients.json",
        });

        cy.get('[data-test="ingredient"]').as("ingredient");
        cy.get('[data-test="constructor"]').as("constructor");
        cy.get('[data-test="price"]').as("price");
    });

    it("should drag and drop ingredients", function () {
        cy.get("@ingredient").eq(0).trigger("dragstart"); //check bun
        cy.get("@constructor").trigger("drop");

        cy.get("@price").find("p").should("have.text", 2510);

        cy.get("@ingredient").eq(5).trigger("dragstart"); //check not bun
        cy.get("@constructor").trigger("drop");

        cy.get("@price").find("p").should("have.text", 2934);

        cy.get("@ingredient").eq(0).find(".counter__num").should("have.text", 2);
        cy.get("@ingredient").eq(5).find(".counter__num").should("have.text", 1);
    });

    it("should remove ingredients", function () {
        // довляю два одинаковых элемента
        cy.get("@ingredient").eq(5).trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("@ingredient").eq(5).trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        // проверяю изменился ли счетчик
        cy.get("@ingredient").eq(5).find(".counter__num").should("have.text", 2);
        cy.get("[data-test=constructor-ingredient]").should("have.length", 2);

        cy.get("@price").find("p").should("have.text", 848); //проверяю цену

        cy.get("[data-test=constructor-ingredient]")
            .eq(1)
            .find(".constructor-element__action")
            .click(); // клик по кнопке удалить

        cy.get("@ingredient").eq(5).find(".counter__num").should("have.text", 1); // проверяю счестчик
        cy.get("[data-test=constructor-ingredient]").should("have.length", 1); //проверяю количество элементов в конструкторе
        cy.get("@price").find("p").should("have.text", 424); //проверяю цену
    });

    it("should open ingredient modal", function () {
        cy.get("@ingredient").eq(5).click();
        cy.get('[data-test="modal"]')
            .find("[data-test=ingredient-name]")
            .should("have.text", "Биокотлета из марсианской Магнолии");
        cy.get('[data-test="modal"]').find('[data-test="calories"]').should("have.text", 4242);
        cy.get('[data-test="modal"]').find('[data-test="proteins"]').should("have.text", 420);
        cy.get('[data-test="modal"]').find('[data-test="fat"]').should("have.text", 142);
        cy.get('[data-test="modal"]').find('[data-test="carbohydrates"]').should("have.text", 242);
    });

    it("should create order with error", function () {
        cy.get("@ingredient").eq(5).trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("[data-test=create-order-btn]").click();

        cy.visit("http://localhost:3000/login");

        cy.get('[type="email"]').should("be.visible").type("anna@anna.com");

        cy.get('[type="password"]').should("be.visible").type("anna123");;

        cy.get('[type="submit"]').click();

        cy.get("[data-test=create-order-btn]").click();
        cy.get("[data-test=modal]");

        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
            ingredients: [
                "60d3b41abdacab0026a733cb",
            ],
        })
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);
        cy.get("#react-modals").find('[data-test="order-error"]').should("have.text", "Ошибка!");

    });

    it("should create order", function () {
        cy.get("@ingredient").eq(0).trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("@ingredient").eq(5).trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("[data-test=create-order-btn]").click();

        cy.visit("http://localhost:3000/login");

        cy.get('[type="email"]').should("be.visible").type("anna@anna.com");

        cy.get('[type="password"]').should("be.visible").type("anna123");

        cy.get('[type="submit"]').click();

        cy.get("[data-test=create-order-btn]").click();

        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
            body: {
                ingredients: [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733cb",
                    "60d3b41abdacab0026a733c6",
                ],
            },
        })

        cy.get("[data-test=modal]");
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000);
        cy.get("#react-modals").find('[data-test="order-error"]').should("not.exist");
    });
});
