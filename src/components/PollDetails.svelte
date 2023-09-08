<script>
  import { tweened } from "svelte/motion";
  import PollStore from "../stores/PollStore.js";
  import Card from "../shared/Card.svelte";
  import Button from "../shared/Button.svelte";

  export let poll;

  const handleVote = (option, id) => {
    PollStore.update((currentPolls) => {
      let auxPolls = [...currentPolls];
      let votedPoll = auxPolls.find((poll) => poll.id == id);
      if (option === "a") {
        votedPoll.votesA++;
      } else if (option === "b") {
        votedPoll.votesB++;
      }
      return auxPolls;
    });
  };

  const handleDelete = (id) => {
    PollStore.update((currentPolls) => {
      return currentPolls.filter((poll) => poll.id != id);
    });
  };

  const tweenA = tweened(0);
  const tweenB = tweened(0);

  $: totalVotes = poll.votesA + poll.votesB;
  $: percentA = Math.floor((100 / totalVotes) * poll.votesA) || 0;
  $: percentB = Math.floor((100 / totalVotes) * poll.votesB) || 0;
  $:tweenA.set(percentA);
  $:tweenB.set(percentB);
</script>

<Card>
  <div class="poll">
    <h3>{poll.question}</h3>
    <p>Total votes: {totalVotes}</p>
    <div class="answer" on:click={() => handleVote("a", poll.id)}>
      <div class="percent percent-a" style="width: {$tweenA}%" />
      <span> {poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" on:click={() => handleVote("b", poll.id)}>
      <div class="percent percent-b" style="width: {$tweenB}%" />
      <span> {poll.answerB} ({poll.votesB})</span>
    </div>
    <div class="delete">
      <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
    </div>
  </div>
</Card>

<style>
  h3 {
    color: #555;
    margin: 0 auto;
  }
  p {
    color: #aaa;
    font-size: 14px;
    margin-top: 6px;
    margin-bottom: 30px;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
  .answer {
    background: #fafafa;
    margin: 10px auto;
    position: relative;
    cursor: pointer;
  }
  .answer:hover {
    opacity: 0.6;
  }
  .percent {
    position: absolute;
    box-sizing: border-box;
    height: 100%;
  }
  .percent-a {
    border-left: 4px solid #d91b42;
    background: rgba(217, 27, 66, 0.2);
  }
  .percent-b {
    border-left: 4px solid #45c496;
    background: rgba(69, 196, 150, 0.2);
  }
  .delete {
    text-align: center;
    margin-top: 30px;
  }
</style>
