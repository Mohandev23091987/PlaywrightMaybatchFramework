Act as a Senior SDET specializing in Playwright, TypeScript, UI automation, Page Object Model, data-driven testing, and test-framework design.

Objective:
Create reliable UI automation tests for the specified feature within the existing Playwright TypeScript framework.

Feature:
- Feature name: [FEATURE NAME]
- Application URL or route: [URL OR ROUTE]
- User role: [USER ROLE]
- User workflow: [WORKFLOW]
- Expected behavior: [EXPECTED BEHAVIOR]

Detailed requirements:
[PASTE THE COMPLETE UI WORKFLOW, ACCEPTANCE CRITERIA, TEST DATA, AND EXPECTED RESULTS HERE]

Phase 1 — Inspect the existing framework

Before writing or modifying code, inspect:

- Project folder structure
- package.json and existing npm scripts
- playwright.config.ts
- tsconfig.json
- Existing UI test specifications
- Page-object classes
- Custom fixtures
- Authentication and login setup
- Global setup and teardown
- Storage-state configuration
- Utilities and helper functions
- ExcelReader and other test-data utilities
- Excel files, JSON files, and other test-data sources
- Environment-variable configuration
- Locator strategy
- Assertions and reusable validation methods
- Reporting configuration
- Allure integration, if present
- Existing naming, formatting, and coding conventions

Summarize the relevant framework patterns you identified and list the files that need to be created or modified.

Do not start implementation until you understand how the existing framework handles page objects, fixtures, authentication, test data, configuration, and reporting.

Phase 2 — Design the test coverage

Derive test scenarios from the supplied workflow, acceptance criteria, and existing application behavior.

Include applicable scenarios such as:

Positive scenarios:
- Successful completion of the primary user workflow
- Valid input combinations
- Minimum required information
- Optional fields
- Navigation and redirection
- Successful submission
- Confirmation messages
- Persisted or displayed data after submission

Negative scenarios:
- Missing required fields
- Invalid input formats
- Invalid credentials or permissions
- Incorrect field values
- Unsupported input
- Failed submissions
- Server or application error messages, when testable
- Attempts to access restricted functionality

Validation scenarios:
- Field labels and required indicators
- Default values
- Enabled and disabled states
- Visibility of controls
- Validation messages
- Boundary values
- Character limits
- Dropdown values
- Sorting, searching, filtering, or pagination
- Success notifications
- Result data displayed in the UI
- Navigation to the expected page or route

Do not create irrelevant or duplicate tests merely to increase the number of scenarios.

If important requirements or expected results are missing, clearly identify the assumptions or request clarification before implementing behavior that cannot be reliably determined.

Phase 3 — Implement the automation

1. Follow the existing framework

- Use the current folder structure, naming conventions, imports, fixtures, hooks, test-data patterns, and formatting.
- Use the existing Page Object Model.
- Reuse existing fixtures, page objects, authentication state, utilities, and test data.
- Do not create duplicate browser, context, page, login, reporting, or test-data setup.
- Do not create a separate automation framework.
- Keep changes limited to the requested feature and any directly required reusable components.

2. Page objects

Update the appropriate page-object class with any missing locators and reusable methods.

Follow these principles:

- Keep locators inside the relevant page-object class unless the existing framework follows a different pattern.
- Keep business-flow assertions in tests unless the framework intentionally provides reusable page-level validation methods.
- Create small, clearly named methods representing user actions.
- Avoid combining unrelated actions into one large method.
- Reuse existing navigation, login, form, table, modal, and validation methods.
- Add a new page-object class only if the feature represents a page or component not already covered.

3. Locator strategy

Use Playwright's recommended user-facing locators whenever possible, in this order of preference:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`
6. Stable CSS locator, only when necessary

Locator requirements:

- Prefer accessible names and exact matching when appropriate.
- Scope locators to a stable parent, dialog, form, table, or section when needed.
- Avoid fragile XPath expressions.
- Avoid CSS selectors based on generated classes.
- Avoid positional locators such as `nth()` unless the position is part of the requirement and no stable alternative exists.
- Avoid locating elements solely by visual styling.
- Do not invent test IDs or accessibility attributes that do not exist.
- Ensure locators identify the intended element uniquely.

4. Synchronization

Use Playwright's built-in auto-waiting and web-first assertions.

Do not use:

- `page.waitForTimeout()`
- Arbitrary sleep functions
- Repeated manual polling
- Unnecessary `waitForSelector()` calls

When explicit synchronization is required, wait for a meaningful application state, such as:

- Expected URL
- Visible heading
- Enabled button
- Hidden loading indicator
- Completed API response
- Updated table
- Success notification
- Open or closed dialog

Use `page.waitForResponse()` only when network completion is relevant to the workflow, and register the wait before triggering the request.

5. Test data

- Use the existing ExcelReader, JSON reader, fixture, or other test-data utility where applicable.
- Follow the current sheet names, column names, file paths, and TestCaseID conventions.
- Do not create a new reader utility if the required functionality already exists.
- Validate that the required test-data record exists before using its values.
- Convert Excel values to the correct TypeScript types when necessary.
- Avoid hardcoded credentials and environment-dependent data.
- Store secrets and environment-specific values in the existing environment configuration.
- Generate unique runtime data when the workflow requires unique values.
- Do not expose credentials or secrets in logs, screenshots, reports, or source code.

6. Assertions

Use Playwright's web-first `expect` assertions.

Validate applicable visible behavior, including:

- Page URL
- Page title or heading
- Element visibility
- Form field values
- Enabled or disabled state
- Validation messages
- Success or error notifications
- Dialog state
- Table contents
- Search or filter results
- Created or updated data
- Navigation result
- User permissions
- Important UI state after page refresh, when relevant

Use exact expected values when requirements provide them.

Avoid weak assertions such as only checking that an element exists when its text, value, state, or behavior can be validated.

Do not reduce, remove, or weaken valid assertions merely to make a failing test pass.

7. Test reliability

- Give every test a clear, behavior-focused name.
- Keep every test independent.
- Do not rely on test execution order.
- Avoid shared mutable state.
- Ensure tests can run in parallel.
- Avoid duplicate account or data conflicts.
- Create and clean up test data when necessary and supported.
- Use hooks only for genuinely shared setup.
- Do not place complete test logic inside hooks.
- Respect the project's configured retries, timeouts, and worker settings.
- Do not increase timeouts to hide synchronization or performance problems.

8. TypeScript quality

- Use appropriate interfaces or types for test data and page-object parameters.
- Avoid `any` unless the existing framework requires it and no safer type is practical.
- Handle optional Excel or environment values safely.
- Keep imports clean and remove unused code.
- Do not leave commented-out code, debugging statements, placeholder assertions, `test.only`, or unintended `test.skip` calls.
- Follow the project's linting and formatting conventions.

9. Authentication and fixtures

- Use the existing authentication fixture or storage state.
- Do not repeat login steps in every test when the framework already provides authenticated state.
- Use the correct user role for each scenario.
- Keep role-specific credentials in environment variables or existing secure configuration.
- Do not create new browser or page instances inside a test when Playwright fixtures already provide them.

10. Allure reporting

If Allure is already configured, follow the existing project pattern and add applicable metadata such as:

- Feature
- Story
- Severity
- Owner
- Tags
- Description
- Meaningful test steps

Do not install or configure Allure unless explicitly requested.

Phase 4 — Execute and verify

After implementation:

1. Run the focused Playwright test file or feature-specific test command.
2. Fix TypeScript compilation errors introduced by the changes.
3. Fix incorrect or unstable locators using evidence from the application.
4. Fix synchronization and test-code failures.
5. Run the relevant type-check command, if configured.
6. Run the relevant lint command, if configured.
7. Rerun the focused tests after every correction.
8. Confirm that the final tests pass consistently.

When diagnosing failures, use available evidence such as:

- Playwright error messages
- Screenshots
- Trace files
- Videos
- Console errors
- Network responses
- DOM inspection
- Application logs, if available

Classify unresolved failures correctly as:

- Test automation defect
- Application defect
- Test-data problem
- Environment problem
- Missing credentials or permissions
- Unclear requirement
- External dependency failure

If the application behavior contradicts a valid requirement, report the defect. Do not alter the expected result to match incorrect behavior.

Required final report

Provide:

1. Framework patterns reused
2. Test scenarios implemented
3. Page objects created or updated
4. Fixtures and utilities reused
5. Test-data source used
6. Files created
7. Files modified
8. Test command executed
9. Type-check and lint commands executed, if applicable
10. Final number of passed, failed, skipped, and blocked tests
11. Assumptions made
12. Unresolved failures or blockers
13. Concise implementation summary

For every failure or blocker, include:

- Test name
- Workflow step
- Expected result
- Actual result
- Relevant error message
- Supporting evidence
- Likely cause
- Recommended next action

Important constraints:

- Do not invent requirements, locators, test data, credentials, or expected results.
- Do not modify unrelated files.
- Do not install packages without explicit approval.
- Do not alter application code unless explicitly requested.
- Do not access production credentials or modify production data.
- Do not create unnecessary files or duplicate framework components.
- Preserve existing functionality and backward compatibility.
- Complete the implementation and verification; do not return only sample code or general instructions.

Feature details:
[PASTE THE COMPLETE FEATURE WORKFLOW, ACCEPTANCE CRITERIA, TEST DATA, AND EXPECTED RESULTS HERE]