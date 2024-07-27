document.addEventListener('DOMContentLoaded', function () {
    // Handle login redirection
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Redirect to dashboard after login
            window.location.href = 'dashboardpage.html';
        });
    }

    // Handle employee creation
    const employeeForm = document.getElementById('employeeForm');
    if (employeeForm) {
        employeeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const employee = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                mobile: document.getElementById('mobile').value,
                designation: document.getElementById('designation').value,
                gender: document.getElementById('gender').value,
                course: document.getElementById('course').value,
                img: document.getElementById('img').files[0]?.name || 'default.png'
            };
            // Save employee data to localStorage
            let employees = JSON.parse(localStorage.getItem('employees')) || [];
            employees.push(employee);
            localStorage.setItem('employees', JSON.stringify(employees));
            // Redirect to employee list
            window.location.href = 'employeelist.html';
        });
    }

    // Load employee list
    const employeeTable = document.getElementById('employeeTable');
    if (employeeTable) {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const tbody = employeeTable.querySelector('tbody');
        employees.forEach((employee, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.mobile}</td>
                <td>${employee.designation}</td>
                <td>${employee.gender}</td>
                <td>${employee.course}</td>
                <td><a href="editemployee.html?index=${index}">Edit</a></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Handle employee editing
    const editEmployeeForm = document.getElementById('editEmployeeForm');
    if (editEmployeeForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const index = urlParams.get('index');
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employee = employees[index];
        
        document.getElementById('editIndex').value = index;
        document.getElementById('editName').value = employee.name;
        document.getElementById('editEmail').value = employee.email;
        document.getElementById('editMobile').value = employee.mobile;
        document.getElementById('editDesignation').value = employee.designation;
        document.getElementById('editGender').value = employee.gender;
        document.getElementById('editCourse').value = employee.course;
        
        editEmployeeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            employees[index] = {
                name: document.getElementById('editName').value,
                email: document.getElementById('editEmail').value,
                mobile: document.getElementById('editMobile').value,
                designation: document.getElementById('editDesignation').value,
                gender: document.getElementById('editGender').value,
                course: document.getElementById('editCourse').value,
                img: document.getElementById('editImg').files[0]?.name || employee.img
            };
            localStorage.setItem('employees', JSON.stringify(employees));
            window.location.href = 'employeelist.html';
        });
    }
});
