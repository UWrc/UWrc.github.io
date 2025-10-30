---
id: monitoring-jobs
title: Monitoring Usage
---

## `hyakusage`

Tillicum provides a convenient utility called `hyakusage` to help users track their usage and costs. `hyakusage` summarizes resource usage and associated costs across users, accounts, and QOS levels.

:::warning
Users are responsible for monitoring their own usage.
:::

### Default

Running `hyakusage` with no arguments prints a usage report for the **current billing cycle** for the **current user**, grouped by **account** and **QOS**.

```js
hyakusage
```

**Key features:**
- Displays usage for all accounts you have access to.
- Shows total GPU-hours and costs per account at the bottom of each account.
- Integrates account-level budgets (if set) to show progress toward limits.

**Example output of October 29, 2025:**

```js
  * Billing cycle starts on the 26th of each month.
  * Usage is counted by job END date.
  * Costs are calculated by base rate ($ 0.9/h) x billable GPU hours, where
      billable GPU hours = raw GPU hours x QOS multiplier.
  * Costs are rounded to nearest cent.

Usage Report for Account account1 (2025-10-26 to 2025-10-29)
╭────────────────────────┬────────────────────────┬────────────────────────╮
│ USER                   │ GPU Hours (hrs)        │ Jobs                   │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ user1                  │         3.40           │           17           │
╰────────────────────────┴────────────────────────┴────────────────────────╯
╭────────────────────────┬────────────────────────┬────────────────────────╮
│ QOS       (multiplier) │ GPU Hours (hrs)        │ Cost (USD)             │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ normal         (x 1.0) │         3.40           │        $3.06           │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ total (selected users) │         3.40           │        $3.06           │
╰────────────────────────┴────────────────────────┴────────────────────────╯
CURRENT BILLING CYCLE total (all users, all qos): 3.40 GPU hours, $3.06

Usage Report for Account account2 (2025-10-26 to 2025-10-29)
╭────────────────────────┬────────────────────────┬────────────────────────╮
│ USER                   │ GPU Hours (hrs)        │ Jobs                   │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ user1                  │         1.26           │           12           │
╰────────────────────────┴────────────────────────┴────────────────────────╯
╭────────────────────────┬────────────────────────┬────────────────────────╮
│ QOS       (multiplier) │ GPU Hours (hrs)        │ Cost (USD)             │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ interactive    (x 1.0) │         0.16           │        $0.14           │
│ normal         (x 1.0) │         1.10           │        $0.99           │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ total (selected users) │         1.26           │        $1.13           │
╰────────────────────────┴────────────────────────┴────────────────────────╯
CURRENT BILLING CYCLE total (all users, all qos): 1.34 GPU hours, $1.21
MONTHLY BUDGET (NOT ENFORCED):      $1.21 /   $1000.00  [░░░░░░░░░░] 0%
```

### Options

The `hyakusage` program has a rich set of command line arguments for more complex queries.

```js
$ hyakusage --help
Print GPU hour usage and costs on Tillicum.
usage: hyakusage [options]

optional arguments:
  -u, -user      comma-separated list of users (default: current user)
  -s, -start     start date YYYY-MM-DD (default: start of current billing cycle)
  -e, -end       end date YYYY-MM-DD inclusive (default: today)
  -a, -account   comma-separated list of accounts (default: all available)
  -q, -qos       comma-separated list of QOS (default: all available)
  -h, -help      show this help message and exit

Notes:
  * Billing cycle starts on the 26th of each month.
  * Usage is counted by job END date.
  * Costs are rounded to nearest cent.
  * You can only see accounts you have access to.
```

### Examples

```js
# To audit all users' resource usage from your group
hyakusage -u all

# To view resource usage for a given time period
hyakusage -s 2025-10-19 -e 2025-10-21

# To filter by specific account and QOS
hyakusage -a account1 -q debug
```