var DateTime = luxon.DateTime;
        currentDate = DateTime.local();
        globalMonth = currentDate.month;
        globalYear = currentDate.year;

        document.addEventListener('DOMContentLoaded', function () {
            // Create the month select dropdown
            var options = {
                1: 'January',
                2: 'February',
                3: 'March',
                4: 'April',
                5: 'May',
                6: 'June',
                7: 'July',
                8: 'August',
                9: 'September',
                10: 'October',
                11: 'November',
                12: 'December',
            };
            var select = document.querySelector('#monthselector');
            for (option in options) {
                select.options[select.options.length] = new Option(options[option], option);
            }
            // Create the year select dropdown
            var options = {
                2018: '2018',
                2019: '2019',
                2020: '2020',
                2021: '2021',
                2022: '2022',
                2023: '2023',
                2024: '2024',
                2025: '2025',
            };
            var select = document.querySelector('#yearselector');
            for (option in options) {
                select.options[select.options.length] = new Option(options[option], option);
            }
            // Select the current year and make that option the selected option.
            for (var i = 0, len = select.options.length; i < len; i++) {
                value = select.options[i].value;
                if (value == currentDate.year) {
                    break;
                }
            }
            select.options[i].setAttribute("selected", "true")
            // Render the initial calendar
            renderCalendar(currentDate.month, currentDate.year);
        });

        // Functions to set values from selectboxes
        function setMonth(month) {
            globalMonth = month;
            renderCalendar();
        }
        function setYear(year) {
            globalYear = year;
            renderCalendar();
        }

        // Function for rendering the calendar
        function renderCalendar() {
            // Define variables
            firstdateofmonth = DateTime.fromObject({ day: 1, month: globalMonth, year: globalYear });
            firstdayofmonth = firstdateofmonth.toFormat('E');
            daysinmonth = DateTime.fromObject({ month: globalMonth, year: globalYear }).daysInMonth
            intday = parseInt(firstdayofmonth);

            const calendar = document.querySelector('#days');
            // Empty the div to render new calendar
            calendar.innerHTML = '';
            // Create the left over days from previous months
            var y = 0;
            while (y < intday - 1) {
                const newday = document.createElement('div');
                newday.setAttribute("class", "lightgrey");
                newday.innerHTML = '';
                calendar.append(newday);
                y += 1;
            }
            // Create the days 
            var i;
            date = firstdateofmonth;
            for (i = 0; i < daysinmonth; i++) {
                const newday = document.createElement('div');
                if (date.day == currentDate.day && date.month == currentDate.month && date.year == currentDate.year) {
                    newday.innerHTML = `<b> ${date.day} </b>`;
                }
                else {
                    newday.innerHTML = date.day;
                }
                calendar.append(newday);
                date = date.plus({ days: 1 });
            };
            leftover = (7 - ((y + i) % 7)) % 7
            if (leftover != 0) {
                var x = 0;
                for (x = 0; x < leftover; x++) {
                    const newday = document.createElement('div');
                    newday.setAttribute("class", "lightgrey");
                    newday.innerHTML = '';
                    calendar.append(newday);
                }
            }
        };