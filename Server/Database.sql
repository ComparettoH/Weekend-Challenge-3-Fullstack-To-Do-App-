--SQL to create 'toDoTable' in database--
CREATE TABLE "toDoTable" (
  "id" serial primary key,
  "task" varchar(250) not null,
  "complete" boolean not null);
  
--SQL to insert test data in 'toDoTable' --
INSERT INTO "toDoTable" ("task", "complete") 
VALUES ('Clean the car', 'true'),
('Clean dishes in kitchen sink', 'false'),
('Go grocery shopping', 'true'),
('Walk the dog', 'true'),
('Take over the world', 'false');