/* Coach's 4-week Conditioning and Strength blocks (from her spreadsheets). */
export const BLOCKS = {
 "conditioning": {
  "id": "conditioning",
  "name": "Conditioning Block",
  "days": [
   {
    "k": "LL",
    "n": "Light Lower"
   },
   {
    "k": "HU",
    "n": "Heavy Upper"
   },
   {
    "k": "HL",
    "n": "Heavy Lower"
   },
   {
    "k": "LU",
    "n": "Light Upper"
   }
  ],
  "weeks": [
   {
    "notes": "on heavy upper I am going to have you rotate between Db incline/barbell incline/multigrip based off availbility",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "SSB",
        "pct": "50%",
        "bands": "green",
        "reps": "5x3SW"
       },
       {
        "lift": "Deadlift",
        "bar": "power Bar",
        "pct": "60%",
        "bands": "orange",
        "reps": "10x1SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "comp bar",
        "pct": "60%",
        "bands": "",
        "reps": "6x8"
       }
      ],
      "acc": [
       [
        "Incline Multi-Grip Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Neutral Grip DB Press",
        [
         "8",
         "8"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Comp bar",
        "pct": "60%",
        "bands": "",
        "reps": "6x8"
       },
       {
        "lift": "Deadlift",
        "bar": "Comp bar",
        "pct": "65%",
        "bands": "",
        "reps": "2x3"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Bulgarian Split Squats",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Back Extensions",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Multi-Grip",
        "pct": "50%",
        "bands": "micro orange",
        "reps": "5x3 SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   },
   {
    "notes": "Try to increase weight every rep of accessories for Light Upper",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "SSB",
        "pct": "55%",
        "bands": "Green",
        "reps": "8x2 SW"
       },
       {
        "lift": "Deadlift",
        "bar": "DL bar",
        "pct": "50%",
        "bands": "orange",
        "reps": "5x3SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "comp",
        "pct": "65%",
        "bands": "",
        "reps": "5x7"
       },
       {
        "lift": "Bench back-offs",
        "bar": "comp",
        "pct": "",
        "bands": "",
        "reps": ""
       }
      ],
      "acc": [
       [
        "Incline DB Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Side Raises SS Front Raises",
        [
         "10",
         "10"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Standing BB OH Press",
        [
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Comp",
        "pct": "65%",
        "bands": "",
        "reps": "5x7"
       },
       {
        "lift": "Deadlift",
        "bar": "Comp",
        "pct": "70%",
        "bands": "",
        "reps": "3x5"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "3-Way Leg Press",
        [
         "set",
         "set",
         "set"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Yukon/Duffalo",
        "pct": "55%",
        "bands": "Micro orange",
        "reps": "7x2SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   },
   {
    "notes": "Try to increase weight every rep of accessories for Light Upper",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Duffalo",
        "pct": "50%",
        "bands": "Green",
        "reps": "5x3SW"
       },
       {
        "lift": "Deadlift",
        "bar": "DL Bar",
        "pct": "55%",
        "bands": "ORANGE",
        "reps": "8x2SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Comp",
        "pct": "75%",
        "bands": "NB",
        "reps": "4x5"
       }
      ],
      "acc": [
       [
        "Incline DB Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Neutral Grip DB Press",
        [
         "8",
         "8"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Comp",
        "pct": "75%",
        "bands": "NB",
        "reps": "4x5"
       },
       {
        "lift": "Deadlift",
        "bar": "DL Bar",
        "pct": "80%",
        "bands": "deficit",
        "reps": "3x2"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Multigrip",
        "pct": "50%",
        "bands": "RED",
        "reps": "5x3SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   },
   {
    "notes": "Try to increase weight every rep of accessories for Light Upper",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Comp bar",
        "pct": "50%",
        "bands": "green",
        "reps": "7x1SW"
       },
       {
        "lift": "Deadlift",
        "bar": "DL Bar",
        "pct": "55%",
        "bands": "ORANGE",
        "reps": "8x2 SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "comp bar",
        "pct": "80%",
        "bands": "NB",
        "reps": "1x2"
       },
       {
        "lift": "Bench back-offs",
        "bar": "comp bar",
        "pct": "70%",
        "bands": "NB",
        "reps": "3x8"
       }
      ],
      "acc": [
       [
        "Incline DB Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Neutral Grip DB Press",
        [
         "8",
         "8"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "comp bar",
        "pct": "80%",
        "bands": "NB",
        "reps": "1x2"
       },
       {
        "lift": "Squat back-offs",
        "bar": "comp bar",
        "pct": "",
        "bands": "NB",
        "reps": "3x8"
       },
       {
        "lift": "Deadlift",
        "bar": "DL bar",
        "pct": "80%",
        "bands": "",
        "reps": "1"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Duffalo",
        "pct": "50%",
        "bands": "micro oranges",
        "reps": "8x2SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   }
  ]
 },
 "strength": {
  "id": "strength",
  "name": "Strength Block",
  "days": [
   {
    "k": "LL",
    "n": "Light Lower"
   },
   {
    "k": "HU",
    "n": "Heavy Upper"
   },
   {
    "k": "HL",
    "n": "Heavy Lower"
   },
   {
    "k": "LU",
    "n": "Light Upper"
   }
  ],
  "weeks": [
   {
    "notes": "on heavy upper I am going to have you rotate between Db incline/barbell incline/multigrip based off availbility",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "SSB",
        "pct": "55%",
        "bands": "RED",
        "reps": "5x3SW"
       },
       {
        "lift": "Deadlift",
        "bar": "power Bar",
        "pct": "60%",
        "bands": "WHITE",
        "reps": "7x2SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "comp bar",
        "pct": "80\u201385%",
        "bands": "2 inch block",
        "reps": "5x3"
       },
       {
        "lift": "Bench back-offs",
        "bar": "",
        "pct": "70%",
        "bands": "no block",
        "reps": "3x6"
       }
      ],
      "acc": [
       [
        "Incline Multi-Grip Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Neutral Grip DB Press",
        [
         "8",
         "8"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "SSB",
        "pct": "75\u201383%",
        "bands": "box",
        "reps": "5x5"
       },
       {
        "lift": "Deadlift",
        "bar": "power bar",
        "pct": "80\u201385%",
        "bands": "box",
        "reps": "5x3"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Bulgarian Split Squats",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Back Extensions",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Multi-Grip",
        "pct": "50%",
        "bands": "RED",
        "reps": "5x3 SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   },
   {
    "notes": "Try to increase weight every rep of accessories for Light Upper",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "SSB",
        "pct": "55%",
        "bands": "RED",
        "reps": "8x2 SW"
       },
       {
        "lift": "Deadlift",
        "bar": "DL bar",
        "pct": "60%",
        "bands": "orange",
        "reps": "10x1 SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "comp",
        "pct": "85%",
        "bands": "pause",
        "reps": "3x3"
       },
       {
        "lift": "Bench back-offs",
        "bar": "comp",
        "pct": "70%",
        "bands": "pause",
        "reps": "2x10"
       }
      ],
      "acc": [
       [
        "Incline DB Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Side Raises SS Front Raises",
        [
         "10",
         "10"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Standing BB OH Press",
        [
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "cambered",
        "pct": "85%",
        "bands": "NB",
        "reps": "3x3"
       },
       {
        "lift": "Squat back-offs",
        "bar": "cambered",
        "pct": "",
        "bands": "NB",
        "reps": ""
       },
       {
        "lift": "Deadlift",
        "bar": "power",
        "pct": "75\u201380%",
        "bands": "deficit",
        "reps": "5x1"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "3-Way Leg Press",
        [
         "set",
         "set",
         "set"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Yukon/Duffalo",
        "pct": "55%",
        "bands": "RED",
        "reps": "7x2SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   },
   {
    "notes": "Try to increase weight every rep of accessories for Light Upper",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Duffalo",
        "pct": "55%",
        "bands": "RED",
        "reps": "5x3SW"
       },
       {
        "lift": "Deadlift",
        "bar": "DL Bar",
        "pct": "60%",
        "bands": "WHITE/ ORANGE",
        "reps": "8x1SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "duffalo",
        "pct": "75\u201380%",
        "bands": "NB",
        "reps": "5x1"
       },
       {
        "lift": "Bench back-offs",
        "bar": "duffalo",
        "pct": "",
        "bands": "",
        "reps": ""
       }
      ],
      "acc": [
       [
        "Incline DB Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Neutral Grip DB Press",
        [
         "8",
         "8"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Duffalo",
        "pct": "75\u201380%",
        "bands": "NB",
        "reps": "3x3"
       },
       {
        "lift": "Squat back-offs",
        "bar": "Duffalo",
        "pct": "",
        "bands": "NB",
        "reps": ""
       },
       {
        "lift": "Deadlift",
        "bar": "DL Bar",
        "pct": "80%",
        "bands": "NB",
        "reps": "4x3"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Yukon/Duffalo",
        "pct": "50%",
        "bands": "RED",
        "reps": "7x2 SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   },
   {
    "notes": "Try to increase weight every rep of accessories for Light Upper",
    "days": {
     "LL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "Comp bar",
        "pct": "50%",
        "bands": "RED",
        "reps": "7x1SW"
       },
       {
        "lift": "Deadlift",
        "bar": "DL Bar",
        "pct": "55%",
        "bands": "WHITE/ ORANGE",
        "reps": "8x2 SW"
       }
      ],
      "acc": [
       [
        "Reverse Hyper",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "GHR",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Good Mornings",
        [
         "8",
         "8",
         "8"
        ]
       ]
      ]
     },
     "HU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "comp bar",
        "pct": "85%",
        "bands": "NB",
        "reps": "5x5"
       },
       {
        "lift": "Bench back-offs",
        "bar": "comp bar",
        "pct": "",
        "bands": "NB",
        "reps": ""
       }
      ],
      "acc": [
       [
        "Incline DB Press",
        [
         "10",
         "10"
        ]
       ],
       [
        "Incline DB Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Flat Bench Flies",
        [
         "10",
         "10"
        ]
       ],
       [
        "Neutral Grip DB Press",
        [
         "8",
         "8"
        ]
       ],
       [
        "Rear Delts",
        [
         "10",
         "10"
        ]
       ],
       [
        "W-Bar Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Rope Tricep Ext",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "HL": {
      "main": [
       {
        "lift": "Squat",
        "bar": "comp bar",
        "pct": "80%",
        "bands": "NB",
        "reps": "5x6"
       },
       {
        "lift": "Squat back-offs",
        "bar": "comp bar",
        "pct": "",
        "bands": "NB",
        "reps": ""
       },
       {
        "lift": "Deadlift",
        "bar": "DL bar",
        "pct": "70%",
        "bands": "NT",
        "reps": "3x5"
       }
      ],
      "acc": [
       [
        "RDL @55%",
        [
         "12",
         "12",
         "12"
        ]
       ],
       [
        "Calf Raises",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Ext",
        [
         "10",
         "10",
         "10"
        ]
       ],
       [
        "Leg Curls",
        [
         "10",
         "10",
         "10"
        ]
       ]
      ]
     },
     "LU": {
      "main": [
       {
        "lift": "Bench",
        "bar": "Duffalo",
        "pct": "50%",
        "bands": "RED",
        "reps": "8x2SW"
       }
      ],
      "acc": [
       [
        "Pull Downs",
        [
         "8",
         "8",
         "8"
        ]
       ],
       [
        "Reverse Pull Downs w/ pause",
        [
         "8",
         "8"
        ]
       ],
       [
        "Standing Pull Overs",
        [
         "10",
         "10"
        ]
       ],
       [
        "DB Rows",
        [
         "12",
         "12"
        ]
       ],
       [
        "Cable Low Row",
        [
         "8",
         "B/O"
        ]
       ],
       [
        "Easy Curl Bar Curls",
        [
         "8",
         "8",
         "drop"
        ]
       ],
       [
        "DB Hammer Curls",
        [
         "8",
         "8"
        ]
       ]
      ]
     }
    }
   }
  ]
 }
};
