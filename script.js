let expenses = [];

function addExpense() {
    try {
        const description = document.getElementById('description').value.trim();
        const amountInput = document.getElementById('amount').value;
        const amount = parseFloat(amountInput);
        const category = document.getElementById('category').value;

        // Enhanced input validation logging
        console.log('Input Validation Check:', {
            description: description,
            amountInput: amountInput,
            parsedAmount: amount,
            category: category,
            isAmountNaN: isNaN(amount),
            hasDescription: !!description
        });

        if (!description) {
            alert('Please enter a description');
            console.warn('Validation failed: No description provided');
            return;
        }
        if (isNaN(amount)) {
            alert('Please enter a valid number for amount');
            console.warn('Validation failed: Amount is not a number');
            return;
        }
        if (amount <= 0) {
            alert('Amount must be greater than 0');
            console.warn('Validation failed: Amount is not positive');
            return;
        }

        const date = new Date().toLocaleDateString();
        const newExpense = { description, amount, category, date };
        expenses.push(newExpense);

        console.log('Expense Added Successfully:', newExpense);
        console.log('Current Expenses Array:', expenses);

        // Clear inputs
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';

        updateDisplay();
    } catch (error) {
        console.error('Error in addExpense:', error);
        alert('An error occurred while adding the expense');
    }
}

function updateDisplay() {
    try {
        console.group('Updating Display'); // Groups related logs together

        // Update expense list
        const expenseList = document.getElementById('expenseList');
        if (!expenseList) {
            console.error('expenseList element not found');
            return;
        }
        
        expenseList.innerHTML = '';
        console.log('Rendering expenses:', expenses.length, 'items');
        
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.description}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
            `;
            expenseList.appendChild(row);
            console.log(`Row ${index + 1}:`, expense);
        });

        // Update summary
        const summaryList = document.getElementById('summaryList');
        if (!summaryList) {
            console.error('summaryList element not found');
            return;
        }

        const totals = {};
        expenses.forEach(expense => {
            totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
        });

        console.log('Calculated totals:', totals);

        summaryList.innerHTML = '';
        Object.entries(totals).forEach(([category, total], index) => {
            const p = document.createElement('p');
            p.textContent = `${category}: $${total.toFixed(2)}`;
            summaryList.appendChild(p);
            console.log(`Summary ${index + 1}: ${category} = $${total.toFixed(2)}`);
        });

        console.groupEnd();
    } catch (error) {
        console.error('Error in updateDisplay:', error);
        alert('An error occurred while updating the display');
    }
}