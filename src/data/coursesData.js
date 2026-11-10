const courses = [
  {
    id: "math",
    titleKey: "mathTitle",
    category: "academic",
    level: "Beginner",
    durationKey: "mathDuration",
    price: "$20",
    instructorKey: "mathInstructor",
    deadlineKey: "mathDeadline",
    descriptionKey: "mathDescription",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000",

    learningPoints: [
      "mathLearning1",
      "mathLearning2",
      "mathLearning3",
      "mathLearning4",
    ],
    requirements: "mathRequirements",
    curriculum: [
      "mathCurriculum1",
      "mathCurriculum2",
      "mathCurriculum3",
      "mathCurriculum4",
    ],
  },

  {
    id: "ged",
    titleKey: "gedTitle",
    category: "examPreparation",
    level: "Intermediate",
    durationKey: "gedDuration",
    price: "$30",
    instructorKey: "gedInstructor",
    deadlineKey: "gedDeadline",
    descriptionKey: "gedDescription",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000",

    learningPoints: [
      "gedLearning1",
      "gedLearning2",
      "gedLearning3",
      "gedLearning4",
    ],
    requirements: "gedRequirements",
    curriculum: [
      "gedCurriculum1",
      "gedCurriculum2",
      "gedCurriculum3",
      "gedCurriculum4",
    ],
  },

  {
    id: "sat",
    titleKey: "satTitle",
    category: "examPreparation",
    level: "Advanced",
    durationKey: "satDuration",
    price: "$35",
    instructorKey: "satInstructor",
    deadlineKey: "satDeadline",
    descriptionKey: "satDescription",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000",

    learningPoints: [
      "satLearning1",
      "satLearning2",
      "satLearning3",
      "satLearning4",
    ],
    requirements: "satRequirements",
    curriculum: [
      "satCurriculum1",
      "satCurriculum2",
      "satCurriculum3",
      "satCurriculum4",
    ],
  },

  {
    id: "english",
    titleKey: "englishTitle",
    category: "languages",
    level: "Beginner",
    durationKey: "englishDuration",
    price: "$25",
    instructorKey: "englishInstructor",
    deadlineKey: "englishDeadline",
    descriptionKey: "englishDescription",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",

    learningPoints: [
      "englishLearning1",
      "englishLearning2",
      "englishLearning3",
      "englishLearning4",
    ],
    requirements: "englishRequirements",
    curriculum: [
      "englishCurriculum1",
      "englishCurriculum2",
      "englishCurriculum3",
      "englishCurriculum4",
    ],
  },

  {
    id: "computer",
    titleKey: "computerTitle",
    category: "technology",
    level: "Beginner",
    durationKey: "computerDuration",
    price: "$25",
    instructorKey: "computerInstructor",
    deadlineKey: "computerDeadline",
    descriptionKey: "computerDescription",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",

    learningPoints: [
      "computerLearning1",
      "computerLearning2",
      "computerLearning3",
      "computerLearning4",
    ],
    requirements: "computerRequirements",
    curriculum: [
      "computerCurriculum1",
      "computerCurriculum2",
      "computerCurriculum3",
      "computerCurriculum4",
    ],
  },

  {
    id: "robotics",
    titleKey: "roboticsTitle",
    category: "technology",
    level: "Advanced",
    durationKey: "roboticsDuration",
    price: "$40",
    instructorKey: "roboticsInstructor",
    deadlineKey: "roboticsDeadline",
    descriptionKey: "roboticsDescription",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",

    learningPoints: [
      "roboticsLearning1",
      "roboticsLearning2",
      "roboticsLearning3",
      "roboticsLearning4",
    ],
    requirements: "roboticsRequirements",
    curriculum: [
      "roboticsCurriculum1",
      "roboticsCurriculum2",
      "roboticsCurriculum3",
      "roboticsCurriculum4",
    ],
  },

  {
    id: "scholarship",
    titleKey: "scholarshipTitle",
    category: "academic",
    level: "Intermediate",
    durationKey: "scholarshipDuration",
    price: "$30",
    instructorKey: "scholarshipInstructor",
    deadlineKey: "scholarshipDeadline",
    descriptionKey: "scholarshipDescription",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",

    learningPoints: [
      "scholarshipLearning1",
      "scholarshipLearning2",
      "scholarshipLearning3",
      "scholarshipLearning4",
    ],
    requirements: "scholarshipRequirements",
    curriculum: [
      "scholarshipCurriculum1",
      "scholarshipCurriculum2",
      "scholarshipCurriculum3",
      "scholarshipCurriculum4",
    ],
  },

  {
    id: "exam",
    titleKey: "examTitle",
    category: "examPreparation",
    level: "Intermediate",
    durationKey: "examDuration",
    price: "$20",
    instructorKey: "examInstructor",
    deadlineKey: "examDeadline",
    descriptionKey: "examDescription",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",

    learningPoints: [
      "examLearning1",
      "examLearning2",
      "examLearning3",
      "examLearning4",
    ],
    requirements: "examRequirements",
    curriculum: [
      "examCurriculum1",
      "examCurriculum2",
      "examCurriculum3",
      "examCurriculum4",
    ],
  },

  {
    id: "school",
    titleKey: "schoolTitle",
    category: "academic",
    level: "Beginner",
    durationKey: "schoolDuration",
    price: "$15",
    instructorKey: "schoolInstructor",
    deadlineKey: "schoolDeadline",
    descriptionKey: "schoolDescription",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",

    learningPoints: [
      "schoolLearning1",
      "schoolLearning2",
      "schoolLearning3",
      "schoolLearning4",
    ],
    requirements: "schoolRequirements",
    curriculum: [
      "schoolCurriculum1",
      "schoolCurriculum2",
      "schoolCurriculum3",
      "schoolCurriculum4",
    ],
  },

  {
    id: "accelerated",
    titleKey: "acceleratedTitle",
    category: "academic",
    level: "Advanced",
    durationKey: "acceleratedDuration",
    price: "$35",
    instructorKey: "acceleratedInstructor",
    deadlineKey: "acceleratedDeadline",
    descriptionKey: "acceleratedDescription",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",

    learningPoints: [
      "acceleratedLearning1",
      "acceleratedLearning2",
      "acceleratedLearning3",
      "acceleratedLearning4",
    ],
    requirements: "acceleratedRequirements",
    curriculum: [
      "acceleratedCurriculum1",
      "acceleratedCurriculum2",
      "acceleratedCurriculum3",
      "acceleratedCurriculum4",
    ],
  },
];

export default courses;