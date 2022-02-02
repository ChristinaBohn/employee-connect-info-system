INSERT INTO departments (department_name)
VALUES  ("Cafe"),
        ("Production"),
        ("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Barista", 80000, 1),
        ("Cafe Manager", 100000, 1),
        ("Bean Roaster", 80000, 2),
        ("Sales Ambassador", 110000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ( "Pam", "Beesly", 4, NULL),
        ( "Jim", "Halpert", 1, 1),
        ( "Michael", "Scott", 1, 1),
        ( "Dwight", "Schrute", 2, 1);