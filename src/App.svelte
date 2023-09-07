<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";
  import PollList from "./components/PollList.svelte";
  import Tabs from "./shared/Tabs.svelte";

  // declarations for tabs component functionality
  let items = ["Current Polls", "Add New Poll"];
  let activeItem = "Current Polls";

  const tabChange = (e) => {
    activeItem = e.detail;
  };

  // polls functionality
  let polls = [
    {
      id: 1,
      question: "Maradona or Messi?",
      answerA: "Maradona",
      answerB: "Messi",
      votesA: 9,
      votesB: 15,
    },
  ];
  const handleAdd = (e) => {
    const poll = e.detail;
    polls = [poll, ...polls];
    activeItem = "Current Polls";
  };
  const handleVote = (e) => {
    const { id, option } = e.detail;
    let auxPolls = [...polls];
    let votedPoll = auxPolls.find((poll) => poll.id == id);
    if (option === "a") {
      votedPoll.votesA++;
    } else if (option === "b") {
      votedPoll.votesB++;
    }

    polls = auxPolls;
  };
</script>

<Header />

<main>
  <Tabs {activeItem} {items} on:tabChange={tabChange} />
  {#if activeItem === "Current Polls"}
    <PollList {polls} on:vote={handleVote} />
  {:else if activeItem === "Add New Poll"}
    <CreatePollForm on:add={handleAdd} />
  {/if}
</main>

<Footer />

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
</style>
