This is budget tracking software built for my own uses, hosted on https://budget.macrodawg.com. It combines double-entry bookkeping with zero cash-flow budgeting, allowing for the consistency of professional accounting software with the usable of personal budgeting software. Linux/Nginx/PostgreSQL/PHP backend.


# CHANGELOG

## 2024-06-01
- Greatly reduced memory/sessionStorage usage by removing dailyBals with no change

## 2023-04-29
- Minor external libs update

## 2023-01-13
- Removed closed=false accounts from transactions addition input

## 2022-12-18
- Added savings graph
- Improved speed of after-data init processing (300ms -> 100ms)
- Fixed bug with cloning negative values in transactions

## 2022-08-14
- Added monthly calendar - JS generated + nicely printable
- Added more optimization (reduced SQL load + key size)
- Added dates to transaction graph
- Removed Font Awesome dependency
- Upgraded BS Icons dependency

## 2022-08-05
- Added minor optimization (localStorage space)

## 2022-04-30
- Added major cleanup of init file
- Added child accounts to transactions page
- Added more statistics to assets page
- Improved styling of transactions and expense pages
- Replaced $.Deferred with Promises

## 2022-04-23
- Added major styling changes to CSS & HTML
- Added better consolidation for detailed accounts in navbar
- Added asset balance and liability balance donut graphs

## 2022-03-02
- Added own style-bs file instead of econforecasting.com dependency
- Fixed closed accounts showing up in sidebar
- Updated BS, DataTables versions

## 2021-05-25
- Fixed new transaction date to match local timezone

## 2021-05-21
- Added expense tracker - code and graph
- Fixed bug with monthly budget not loading if no data for that month or previous month
- Fixed bug with timezones a day off

## 2021-04-10
- Added modify budget code
- Added table to compare monthly budget level
- Added date range to budget page and month switcher
- Added nice progress bars
- Added budget page link to sidebar

## 2021-04-04
- Added initial work on budget page
- Added modals for add new budget
- Added JS code for loading datatable
- Added JS code for auto-calculating sum values & validations (NOTE: datatable currently reloads full table on keyup change; therefore a setTimeout reload is used for the meanwhile)

## 2021-04-01
- Added clone button to easily copy similar transactions
- Updated to latest JS libraries
- Updated to latest version of web-framework
- Updated code compatability for Bootstrap 5

## 2019-03-29
- Minor CSS changes

## 2019-02-27
- Fixed issue with autofilling
- Added debit/credit bug fix

## 2019-01-03
- Added autofill
