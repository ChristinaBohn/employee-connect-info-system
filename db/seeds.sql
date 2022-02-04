INSERT INTO departments (department_name)
VALUES  ("Cafe"),
        ("Production"),
        ("Donut Shop");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Barista", 80000, 1),
        ("Donut Chef", 100000, 1),
        ("Bean Roaster", 80000, 2),
        ("Cafe Manager", 110000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ( "Pam", "Beesly", 4, NULL),
        ( "Jim", "Halpert", 2, 1),
        ( "Michael", "Scott", 1, 1),
        ( "Dwight", "Schrute", 3, 1);