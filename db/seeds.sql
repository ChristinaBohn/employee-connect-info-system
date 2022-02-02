INSERT INTO departments (id, department_name)
VALUES  (001, "Cafe"),
        (002, "Production"),
        (003, "Marketing");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (001, "Barista", 80000, 001),
        (002, "Cafe Manager", 100000, 001),
        (003, "Bean Roaster", 80000, 002),
        (004, "Sales Ambassador", 110000, 003);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "Jim", "Halpert", 001, 002,),
        (002, "Pam", "Beesly", 004),
        (003, "Michael", "Scott", 002),
        (004, "Dwight", "Schrute", 003, 002);