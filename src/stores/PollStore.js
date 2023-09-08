import { writable } from "svelte/store";

const PollStore = writable([
  {
    id: 1,
    question: "Maradona or Messi?",
    answerA: "Maradona",
    answerB: "Messi",
    votesA: 9,
    votesB: 15,
  },
]);

export default PollStore;
