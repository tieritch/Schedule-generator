// ------------------ DATA SETUP ------------------

// Define the list of courses with number of sessions per week
const courses = [
  { prof: "Prof A", subject: "Math", class: "Class 1", sessions: 3 },
  { prof: "Prof A", subject: "Physics", class: "Class 1", sessions: 2 },
  { prof: "Prof B", subject: "Chemistry", class: "Class 2", sessions: 2 },
  { prof: "Prof B", subject: "English", class: "Class 2", sessions: 1 },
  { prof: "Prof C", subject: "Biology", class: "Class 3", sessions: 1 },
  { prof: "Prof C", subject: "Math", class: "Class 2", sessions: 2 },
  { prof: "Prof C", subject: "Geography", class: "Class 1", sessions: 1 }
];

// Define available days and hours
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const hours = ["8h", "10h", "14h"];

// Create all possible time slots for the week
const timeSlots = [];
days.forEach(day => {
  hours.forEach(hour => {
    timeSlots.push({ day, hour });
  });
});

// ------------------ HELPER FUNCTIONS ------------------

// Fisher-Yates Shuffle to randomize time slots
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate a unique key for each time slot
function slotKey(slot) {
  return `${slot.day} ${slot.hour}`;
}
// keep an orderd copy of timeSlots before shuffling
const orderedTimeSlots=[...timeSlots];
// ------------------ SCHEDULING LOGIC ------------------
// Shuffle time slots to ensure randomness
shuffle(timeSlots);
// Initialize empty schedules for professors and classes
const schedule = {
  profs: {},
  classes: {}
};

// Final structured timetable entries
const finalSchedule = [];

courses.forEach(course => {
  const { prof, subject, class: className, sessions } = course;

  // Ensure we have a schedule object for the prof and the class
  if (!schedule.profs[prof]) schedule.profs[prof] = {};
  if (!schedule.classes[className]) schedule.classes[className] = {};

  let sessionsToAssign = sessions;

  // Loop through available time slots to assign sessions
  for (let slot of timeSlots) {
    const key = slotKey(slot);

    // Assign only if both the prof and class are free at that time
    if (!schedule.profs[prof][key] && !schedule.classes[className][key]) {
      schedule.profs[prof][key] = subject;
      schedule.classes[className][key] = subject;

      finalSchedule.push({
        prof,
        class: className,
        subject,
        day: slot.day,
        hour: slot.hour
      });

      sessionsToAssign--;
    }

    // Stop once all sessions for this course are assigned
    if (sessionsToAssign === 0) break;
  }
});

// ------------------ DISPLAY RESULTS ------------------

// Display schedule by class
console.log("\n=== Weekly Schedule by Class ===");
for (let className in schedule.classes) {
  console.log(`\n${className}:`);
  orderedTimeSlots.forEach(slot => {
    const key = slotKey(slot);
    const subject = schedule.classes[className][key] || "Free";
    console.log(`  ${key} : ${subject}`);
  });
}

// Display schedule by professor
console.log("\n=== Weekly Schedule by Professor ===");
for (let prof in schedule.profs) {
  console.log(`\n${prof}:`);
  orderedTimeSlots.forEach(slot => {
    const key = slotKey(slot);
    const subject = schedule.profs[prof][key] || "Free";
    console.log(`  ${key} : ${subject}`);
  });
}
console.log("Hey");