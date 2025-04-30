# 🧪 nopCommerce Playwright Test Suite

This repository contains automated UI test cases using **[Playwright](https://playwright.dev/)** for testing key components of the [nopCommerce demo site](https://demo.nopcommerce.com/) as part of software testing labs:

- **Lab 3:** Equivalence Partitioning & Boundary Value Analysis
- **Lab 4:** State Transition Testing
- **Lab 5:** End-to-End Use Case Testing

---

## 📁 Project Structure

```
├── tests/
│   ├── bva-books.spec.ts               # Boundary Value Analysis for book prices
│   ├── decision.spec.ts                # Decision Table Testing for discounts
│   ├── register-api.spec.ts            # API testing for user registration
│   ├── state_transition.spec.ts        # State Transition Testing for login
│   ├── use_case_testing.spec.ts        # End-to-End Use Case Testing
│   └── example.spec.ts                 # Example Playwright tests
├── tests-examples/
│   └── demo-todo-app.spec.ts           # Demo Todo App tests
├── playwright.config.ts                # Playwright configuration
├── package.json                        # Project dependencies
├── .github/workflows/playwright.yml    # GitHub Actions workflow for CI
└── README.md                           # Project documentation
```

---

## 🔧 Setup Instructions

1. **Clone this repository**

```bash
git clone https://github.com/yourusername/nopcommerce-playwright-tests.git
cd nopcommerce-playwright-tests
```

2. **Install dependencies**

```bash
npm install
```

3. **Run tests**

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/use_case_testing.spec.ts
```

4. **View HTML Test Report**

```bash
npx playwright show-report
```

---

## 🧪 Lab Descriptions

### ✅ Lab 3: Input Field Validation

**Objective:**
Use Equivalence Partitioning & Boundary Value Analysis to validate form inputs such as quantity, email, and password fields.

**Covered Scenarios:**
- Empty input
- Invalid characters
- Boundary min/max checks
- Valid partitions

### 🔐 Lab 4: Login State Transition Testing

**Objective:**
Model login logic as a state machine and test all transitions.

**States Modeled:**
- Start (Not Logged In)
- Logged In
- Invalid Login Attempt
- Locked Out (if triggered)

**Artifacts:**
- Automated test simulates login scenarios

### 🛒 Lab 5: End-to-End Checkout Flow

**Objective:**
Test complete user flow from product selection to order confirmation.

**Steps Automated:**
- Visit nopCommerce site
- Select product
- Add to cart
- Login
- Checkout and fill all details
- Confirm order and verify success message

---

## ✅ Success Criteria

- All tests pass without failure
- State transitions align with expected behavior
- Order completes successfully and displays confirmation message

---

## 🔄 Reflection

**Q1: Most effective technique?**
- Use Case Testing for confidence in real user workflows
- State Transitions for logical integrity of the login process

**Q2: Automation vs Manual Challenges?**
- Automation: Locator stability, async timing
- Manual: Time-consuming, prone to human error

**Q3: CI/CD Integration?**
- Add tests to GitHub Actions or Jenkins
- Run on every push/PR
- Fail builds if any critical tests fail

---

## 📸 Screenshots / Diagrams

- See test results in the `playwright-report/` folder.

---


## 📜 License

This project is licensed under the MIT License.