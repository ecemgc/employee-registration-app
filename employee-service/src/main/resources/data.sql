CREATE TABLE IF NOT EXISTS departments (
                                           id BIGSERIAL PRIMARY KEY,
                                           name VARCHAR(255) UNIQUE NOT NULL,
                                           description TEXT,
                                           created_at TIMESTAMP,
                                           updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
                                         id BIGSERIAL PRIMARY KEY,
                                         first_name VARCHAR(255) NOT NULL,
                                         last_name VARCHAR(255) NOT NULL,
                                         email VARCHAR(255) UNIQUE NOT NULL,
                                         password VARCHAR(255) NOT NULL,
                                         phone VARCHAR(255) UNIQUE NOT NULL,
                                         address VARCHAR(255),
                                         image_url VARCHAR(255),
                                         start_date TIMESTAMP,
                                         end_date TIMESTAMP,
                                         created_at TIMESTAMP,
                                         updated_at TIMESTAMP,
                                         is_active BOOLEAN NOT NULL DEFAULT TRUE,
                                         department_id BIGINT REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS roles (
                                     id BIGSERIAL PRIMARY KEY,
                                     name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_roles (
                                              id BIGSERIAL PRIMARY KEY,
                                              employee_id BIGINT REFERENCES employees(id),
                                              role_id BIGINT REFERENCES roles(id)
);


INSERT INTO departments (id, name, description, created_at, updated_at) values (1, 'Management', 'Management Department', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (id) DO NOTHING;
INSERT INTO departments (id, name, description, created_at, updated_at) values (2, 'HR', 'Human Resources', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (id) DO NOTHING;

INSERT INTO employees (id, first_name, last_name, email, password, phone, address, image_url, start_date, end_date, created_at, updated_at, is_active, is_deleted, department_id) values (1, 'Ecem', 'Günenç', 'ecemgunenc@outlook.com', '$2a$10$OAKr0h0FBvdRKXRMmap4yuJgZNb2vAxthTs5Syr.Kk1gi1mgLjR1K', '05384180214', 'İstanbul', null, CURRENT_TIMESTAMP, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, 1) ON CONFLICT (id) DO NOTHING;

INSERT INTO roles (id, name) VALUES (1, 'ADMIN') ON CONFLICT (id) DO NOTHING;

INSERT INTO roles (id, name) VALUES (2, 'WRITE_DEPARTMENT') ON CONFLICT (id) DO NOTHING;
INSERT INTO roles (id, name) VALUES (3, 'READ_DEPARTMENT') ON CONFLICT (id) DO NOTHING;

INSERT INTO roles (id, name) VALUES (4, 'WRITE_EMPLOYEE') ON CONFLICT (id) DO NOTHING;
INSERT INTO roles (id, name) VALUES (5, 'READ_EMPLOYEE') ON CONFLICT (id) DO NOTHING;

INSERT INTO roles (id, name) VALUES (6, 'WRITE_ROLE') ON CONFLICT (id) DO NOTHING;
INSERT INTO roles (id, name) VALUES (7, 'READ_ROLE') ON CONFLICT (id) DO NOTHING;


INSERT INTO employee_roles (id, employee_id, role_id) values (1, 1, 1) ON CONFLICT (id) DO NOTHING;

SELECT setval('departments_id_seq', (SELECT MAX(id) FROM departments));
SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees));
SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));
SELECT setval('employee_roles_id_seq', (SELECT MAX(id) FROM employee_roles));