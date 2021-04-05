This is budget tracking software built for my own uses, hosted on https://budget.macrodawg.com. It combines double-entry bookkeping with zero cash-flow budgeting, allowing for the consistency of professional accounting software with the usable of personal budgeting software. Linux/Nginx/PostgreSQL/PHP backend.

# TO-DO
- Add submit button & SQL insert to submit page
- Add date range to each budget
- Add edit budget modal
- Add table to compare monthly budget level
- Add ability to switch between months


# CHANGELOG

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
