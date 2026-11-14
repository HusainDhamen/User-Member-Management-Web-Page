USE bridges_db;


INSERT INTO members (full_name, email)
VALUES
('Mahmoud Mandani', 'mahmoud@example.com'),
('Gianny Castillo', 'gianny@example.com'),
('Husain Aldhamen', 'husain@example.com');


INSERT INTO submissions
(submittedBy, title, category, description, status)
VALUES
('Mahmoud Mandani', 'Food Pantry Assistance', 'Community',
 'Free food assistance for community members.', 'pending'),

('Gianny Castillo', 'Free Tutoring Program', 'Study',
 'Free tutoring sessions for students.', 'approved'),

('Husain Aldhamen', 'Cybersecurity Study Group', 'Study',
 'A study group for students interested in cybersecurity.', 'pending');
