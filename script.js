let expenses = [];

        function addExpense() {
            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;

            if (!description || isNaN(amount) || amount <= 0) {
                alert('Please enter a valid description and amount');
                return;
            }

            const date = new Date().toLocaleDateString();
            expenses.push({ description, amount, category, date });

            // Clear inputs
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';

            updateDisplay();
        }

        function updateDisplay() {
            // Update expense list
            const expenseList = document.getElementById('expenseList');
            expenseList.innerHTML = '';
            expenses.forEach(expense => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.description}</td>
                    <td>$${expense.amount.toFixed(2)}</td>
                    <td>${expense.category}</td>
                    <td>${expense.date}</td>
                `;
                expenseList.appendChild(row);
            });

            // Update summary
            const summaryList = document.getElementById('summaryList');
            const totals = {};
            expenses.forEach(expense => {
                totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
            });

            summaryList.innerHTML = '';
            for (const [category, total] of Object.entries(totals)) {
                const p = document.createElement('p');
                p.textContent = `${category}: $${total.toFixed(2)}`;
                summaryList.appendChild(p);
            }
        }