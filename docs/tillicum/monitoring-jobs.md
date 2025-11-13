---
id: monitoring-jobs
title: Monitoring Usage
---

## `hyakusage`

Tillicum provides a convenient utility called `hyakusage` to help users track their usage and costs. `hyakusage` summarizes resource usage and associated costs across users, accounts, and QOS levels.

:::warning
Users are responsible for monitoring their own usage.
:::

### Budget Enforcement

Tillicum supports budget settings at both the **account** and **user** levels. Once a budget is configured, **budget enforcement is enabled by default**. If you are a PI and prefer to monitor usage only without enforcing automatic job submission termination when a budget is exceeded, please contact us at <ins>help@uw.edu</ins> and include "Tillicum" in the subject line.

Budgets are managed by the Tillicum administrators. To **add, update, or remove** a budget, please email <ins>help@uw.edu</ins> with "Tillicum" in the subject line with the approval from your PI.

### Default

Running `hyakusage` with no arguments prints a usage report for the **current billing cycle** for the **current user**, grouped by **account** and **QOS**. Additionally, a budget usage summary will also be included if the user- or account-level budget is defined.

```js
hyakusage
```

**Key features:**
- Displays usage for all accounts you have access to.
- Shows total GPU-hours and costs per account at the top of each account.
- Integrates user- and account-level budgets (if set) to show progress toward limits.

**Example output from November 12, 2025:**

```js
  * Billing cycle starts on the 26th of each month.
  * Usage is counted by job END date.
  * Costs are calculated by base rate ($ 0.9/h) x billable GPU hours,
      where billable GPU hours = raw GPU hours x QOS multiplier.
  * Costs are rounded to nearest cent.

Usage Report for Account account1:
Current Billing Cycle TOTAL Usage: 26.23 GPU hours, $23.61
╭───────────────────────────────────────────────────────╮
│    Usage User Breakdown (2025-10-26 to 2025-11-12)    │
├────────────────────────┬─────────────────┬────────────┤
│ USER                   │ GPU HOURS (HRS) │    JOBS    │
├────────────────────────┼─────────────────┼────────────┤
│ user1                  │            3.69 │         16 │
╰────────────────────────┴─────────────────┴────────────╯
╭───────────────────────────────────────────────────────╮
│     Usage QOS Breakdown (2025-10-26 to 2025-11-12)    │
├────────────────────────┬─────────────────┬────────────┤
│ QOS       (MULTIPLIER) │ GPU HOURS (HRS) │ COST (USD) │
├────────────────────────┼─────────────────┼────────────┤
│ interactive    (x 1.0) │            3.44 │      $3.09 │
│ normal         (x 1.0) │            0.26 │      $0.23 │
├────────────────────────┼─────────────────┼────────────┤
│ TOTAL (selected users) │            3.69 │      $3.33 │
╰────────────────────────┴─────────────────┴────────────╯
╭─────────────────────────────────────────────────────────────────╮
│                       Budget Usage Summary                      │
├──────────────┬─────────────────────┬────────┬─────────┬─────────┤
│ USER         │  USED/BUDGET (USD)  │ USED % │   TYPE  │ ENFORCE │
├──────────────┼─────────────────────┼────────┼─────────┼─────────┤
│ user1        │       5.92 / 500.00 │     1% │   total │    true │
├──────────────┼─────────────────────┼────────┼─────────┼─────────┤
│ account1     │     23.61 / 1000.00 │     2% │ monthly │   false │
╰──────────────┴─────────────────────┴────────┴─────────┴─────────╯
```

### Options

The `hyakusage` program has a rich set of command line arguments for more complex queries.

```js
$ hyakusage --help
Print GPU hour usage and costs on Tillicum.

Usage: hyakusage [options]

Example: hyakusage -u all
  Show usage for all users in your accessible accounts in current billing cycle.

Optional arguments:
  -u, -user      Comma-separated list of users or "all" for all users in your accessible accounts (default: current user)
  -s, -start     Start date YYYY-MM-DD (default: start of current billing cycle)
  -e, -end       End date YYYY-MM-DD inclusive (default: today)
  -a, -account   Comma-separated list of accounts  or "all" for all accessible accounts (default: all)
  -q, -qos       Comma-separated list of QOS  or "all" for all QOS in your accessible accounts (default: all)
  -h, -help      Show this help message and exit

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
hyakusage -s 2025-10-15 -e 2025-10-25

# To filter by specific account and QOS
hyakusage -a account1 -q debug
```
