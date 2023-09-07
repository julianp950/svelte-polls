<script>
  import { createEventDispatcher } from "svelte";
  import Card from "../shared/Card.svelte";
  export let poll;

  const dispatch = createEventDispatcher();
  const handleVote = (option, id) => {
    dispatch("vote", { option: option, id: id });
  };

  $: totalVotes = poll.votesA + poll.votesB;
</script>

<Card>
  <div class="poll">
    <h3>{poll.question}</h3>
    <p>Total votes: {totalVotes}</p>
    <div class="answer" on:click={() => handleVote("a", poll.id)}>
      <div class="percent percent-a" />
      <span> {poll.answerA} ({poll.votesA})</span>
    </div>
    <div class="answer" on:click={() => handleVote("b", poll.id)}>
      <div class="percent percent-b" />
      <span> {poll.answerB} ({poll.votesB})</span>
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
  .answer {
    background: #fafafa;
    margin: 10px auto;
    position: relative;
    cursor: pointer;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
</style>
