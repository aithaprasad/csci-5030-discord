const checkForEmptyFields = require("../routes/checkForEmpty");

test("check whether it's an empty json", () => {
  expect(
    checkForEmptyFields.checkEmptyFields({
      name: "dummy",
      email: "dummy@gmail.com",
      password: "resettedPassword",
    })
  ).toBe("All good");
});
