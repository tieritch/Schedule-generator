How It Works :

Courses Definition:

Each course has a professor, a subject, a class, and a number of weekly sessions.

Time Slots Generation:

A combination of days and hours produces a list of all available time slots.

Randomization:

shuffle() ensures that course times are randomly distributed throughout the week.

Conflict-Free Scheduling:

The algorithm assigns time slots to each course only if:

The professor is free at that time.

The class is free at that time.

It continues until the number of required sessions (sessions) is fulfilled for each course.

Result Display:

It prints a full schedule organized by class and by professor, showing what happens at each time slot.