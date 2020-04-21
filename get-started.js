// const dayStart = "07:30";
// const dayEnd = "17:45";

// function scheduleMeeting(startTime, durationMinutes) {
//   const start = dayStart.split(":").join(".");
//   const end = dayEnd.split(":").join(".");

//   const meetingStart = Number(startTime.split(":").join("."));

//   if (meetingStart < start) {
//     return false;
//   }

//   const durationHours =
//     Math.floor(durationMinutes / 60) + "." + (durationMinutes % 60);

//   const meetingEnd = meetingStart + +durationHours;

//   if (meetingEnd > end) {
//     return false;
//   }

//   return true;
// }

// console.log(scheduleMeeting("7:00", 15)); // false
// console.log(scheduleMeeting("07:15", 30)); // false
// console.log(scheduleMeeting("7:30", 30)); // true
// console.log(scheduleMeeting("11:30", 60)); // true
// console.log(scheduleMeeting("17:00", 45)); // true
// console.log(scheduleMeeting("17:30", 30)); // false
// console.log(scheduleMeeting("18:00", 15));

// function range(start, end) {
//   const iterable = {
//     start,
//     end: end,
//     *[Symbol.iterator]() {
//       let i = start;
//       while (i <= this.end) {
//         yield i;
//         i++;
//       }
//     },
//   };
//   if (end || end === 0) {
//     if (start > end) return [];
//     return [...iterable];
//   } else {
//     return function getEnd(curriedEnd) {
//       if (start > curriedEnd) return [];
//       if (curriedEnd) {
//         iterable.end = curriedEnd;
//         return [...iterable];
//       }
//     };
//   }
// }

// console.log(range(3, 3)); // [3]
// console.log(range(3, 8)); // [3,4,5,6,7,8]
// console.log(range(3, 0)); // []

// var start3 = range(3);
// var start4 = range(4);

// console.log(start3(3)); // [3]
// console.log(start3(8)); // [3,4,5,6,7,8]
// console.log(start3(0)); // []

// console.log(start4(6)); // [4,5,6]

function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

var reel = {
  symbols: ["♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },

  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

var slotMachine = {
  reels: [...[...new Array(9)].map((el) => Object.create(reel))],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    const reels = this.reels.map((reel, i) =>
      (i + 1) % 3 ? `${reel.display()} | ` : `${reel.display()}\n`
    );
    return reels.join("");
  },
};

slotMachine.spin();
console.log(slotMachine.display());
slotMachine.spin();
console.log(slotMachine.display());
